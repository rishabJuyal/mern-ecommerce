const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middlewares/auth.middleware");
const {
    getAll,
    update,
    remove,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    getMe
} = require("./user.controller");

// ========= User Routes =========

// Get all users (admin-only assumed)
router.get('/', authMiddleware, getAll);

// Update a user's profile
router.put('/:username', authMiddleware, update);

// Delete a user by name
router.delete('/:name', authMiddleware, remove);

// Get current user profile
router.get('/me', authMiddleware, getMe);

// ========= Address Routes =========

// Add new address to user
router.post('/address', authMiddleware, addAddress);

// Update an existing address by ID
router.put('/address/:addressId', authMiddleware, updateAddress);

// Delete an address by ID
router.delete('/address/:addressId', authMiddleware, deleteAddress);

// Set default address
router.patch('/address/:addressId/default', authMiddleware, setDefaultAddress);

module.exports = router;
