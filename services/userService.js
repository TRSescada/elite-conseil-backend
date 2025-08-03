const User = require('../models/User');

// Get all users
const getAllUsers = async () => {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        throw error;
    }
};

// Create a new user
const createUser = async (userData) => {
    try {
        const user = new User({
            username: userData.username,
            email: userData.email,
            passwordHash: userData.passwordHash,
            role: userData.role || 'READER'
        });

        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
};

// Get a user by ID
const getUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw error;
    }
};

// Edit/update a user by ID
const editUser = async (userId, updateData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

// Delete a user by ID
const deleteUser = async (userId) => {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error('User not found');
        }
        return deletedUser;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    editUser,
    deleteUser
};
