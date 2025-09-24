const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        role:user.role,
        email:user.email
    };

    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
    );
}

function generateRefreshToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        role:user.role,
        email:user.email
    };
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
    );
}


module.exports ={ generateAccessToken, generateRefreshToken}