const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Users = require("../../models/User");
const { generateAccessToken, generateRefreshToken } = require("../../utils/generateTokens");
const RefreshToken = require("../../models/RefreshToken");

exports.signup = async (req, res) => {
    const { name = "Rishab", username, email = "rishabjuyal99@gmail.com", password, adminSecret } = req.body;

    const existed = await Users.findOne({ username });
    if (existed) return res.status(400).send("already have account on this username");

    const hashedPass = await bcrypt.hash(password, 10);

    const ADMIN_SECRET = process.env.ADMIN_SECRET;

    let role = 'customer'; // default role

    // If adminSecret matches, assign admin role
    if (adminSecret && adminSecret === ADMIN_SECRET) {
        role = 'admin';
    }

    const user = await Users.create({ name, username, password: hashedPass, role, email });
    res.json({
        name: user.name,
        username: user.username,
        role: user.role,
    });
}

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });
    if (!user) return res.status(404).send("username not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(404).send("Incorrect Password");

    const payload = {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Set refreshToken as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // Change to true in production, needs HTTPS
        sameSite: "Lax",  // Required for cross-site cookies
        maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
    });
    await RefreshToken.deleteMany({ userId: user._id, ip }); // ⬅️ clear old for same IP
    await RefreshToken.create({
        token: refreshToken,
        userId: user._id,
        ip,
        userAgent,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    res.json({
        jwt: accessToken,
        role: user.role,
    })
}

exports.refresh = async (req, res) => {
    const token = req.cookies.refreshToken;
    const ip = req.ip || req.connection.remoteAddress;

    if (!token) return res.status(401).send("No refresh token");

    const storedToken = await RefreshToken.findOne({ token, ip });
    if (!storedToken) {
        res.clearCookie("refreshToken");
        return res.status(403).send("Refresh Token Not Found");
    }

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = generateAccessToken(decoded);
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        console.log(err);
        res.status(403).send("Invalid refresh token");
    }
}

exports.logout = async (req, res) => {
    const token = req.cookies.refreshToken;
    const ip = req.ip || req.connection.remoteAddress;

    if (token) await RefreshToken.deleteOne({ token, ip });

    res.clearCookie("refreshToken");
    res.send("Logged out");
}

exports.logoutAll = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) res.status(401).send("No refresh token");
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        await RefreshToken.deleteMany({ userId: decoded.id });

        res.clearCookie("refreshToken");
        res.send("Logged out from every device");

    } catch (err) {
        res.status(401).send("Invalid token");
    }
}