const Users = require("../../models/User");

exports.getAll = async (req, res) => {
    res.json(await Users.find().select("-password"));
}
// Get currently logged-in user's profile
exports.getMe = async (req, res) => {
    try {
        const userId = req.user.id; // assuming authMiddleware sets req.user
        const user = await Users.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error("Error fetching current user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

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
            { new: true } //return latest changed data
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

exports.addAddress = async (req, res) => {
    const userId = req.user.id;
    const { fullName, phoneNumber, streetAddress, city, state, postalCode, country, isDefault } = req.body;

    if (!fullName || !phoneNumber || !streetAddress || !city || !postalCode || !country) {
        return res.status(400).json({ error: "All required fields must be provided." });
    }

    const newAddress = { fullName, phoneNumber, streetAddress, city, state, postalCode, country, isDefault };

    try {
        const user = await Users.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (isDefault) {
            // Set any existing default address to non-default
            user.address.forEach(addr => addr.isDefault = false);
        }

        user.address.push(newAddress);
        await user.save();

        const addresses = await user.address;
        res.json({ message: "Address added successfully", addresses });
    } catch (err) {
        console.error("Error adding address:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateAddress = async (req, res) => {
    const userId = req.user.id;
    const { addressId } = req.params;
    const { fullName, phoneNumber, streetAddress, city, state, postalCode, country, isDefault } = req.body;

    if (!fullName || !phoneNumber || !streetAddress || !city || !postalCode || !country) {
        return res.status(400).json({ error: "All required fields must be provided." });
    }

    try {
        const user = await Users.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const address = user.address.id(addressId);
        if (!address) return res.status(404).json({ error: "Address not found" });

        // Update address fields
        address.fullName = fullName;
        address.phoneNumber = phoneNumber;
        address.streetAddress = streetAddress;
        address.city = city;
        address.state = state;
        address.postalCode = postalCode;
        address.country = country;
        address.isDefault = isDefault;

        if (isDefault) {
            // Set other addresses' isDefault to false
            user.address.forEach(addr => {
                if (addr._id.toString() !== addressId) addr.isDefault = false;
            });
        }

        await user.save();
        const addresses = await user.address;
        res.json({ message: "Address updated successfully", addresses });
    } catch (err) {
        console.error("Error updating address:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteAddress = async (req, res) => {
    const userId = req.user.id;
    const { addressId } = req.params;

    try {
        const user = await Users.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const addressIndex = user.address.findIndex(addr => addr._id.toString() === addressId);
        if (addressIndex === -1) return res.status(404).json({ error: "Address not found" });

        // Remove the address from the array
        user.address.splice(addressIndex, 1);

        await user.save();
        res.json({ message: "Address deleted successfully" });
    } catch (err) {
        console.error("Error deleting address:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.setDefaultAddress = async (req, res) => {
    const userId = req.user.id;
    const { addressId } = req.params;

    try {
        const user = await Users.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const address = user.address.id(addressId);
        if (!address) return res.status(404).json({ error: "Address not found" });

        // Set all addresses' isDefault to false
        user.address.forEach(addr => addr.isDefault = false);

        // Set the selected address as default
        address.isDefault = true;

        await user.save();
        const addresses = await user.address;
        res.json({ message: "Default address updated successfully", addresses });
    } catch (err) {
        console.error("Error setting default address:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
