const Users = require("../../models/User");

exports.getAll = async (req, res) => {
    res.json(await Users.find().select("-password"));
}

exports.update = async (req, res) => {
    const userIdInToken = req.user.username;          // From token
    const userIdInParams = req.params.username;       // From route

    // Check if the user is trying to update their own data
    if (req.user.role!=='admin' && userIdInToken !== userIdInParams) {
        return res.status(403).json({ error: "You are not allowed to update another user's profile." });
    }
    try {
        const updateFields = {
            name: req.body.name,
            username: req.body.username
        };

        if (req.body.email) {
            updateFields.email = req.body.email;
        }

        const updated = await Users.findOneAndUpdate(
            { username: req.params.username },
            updateFields,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.remove = async (req, res) => {
    const user = await Users.findOne({ name: req.params.name });
    if (!user) return res.status(404).send("User not found")
    await Users.deleteOne({ name: req.params.name });
    res.json({
        message: "user deleted",
        user
    })
}