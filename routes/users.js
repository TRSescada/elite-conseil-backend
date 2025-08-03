const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Get all users
router.get('/', async (req, res) => {
    res.json({ message: 'Welcome to the Elite Conseil API' })
    // try {
    //     // console.log("this is the users route")
    //     // const users = await userService.getAllUsers();
    //     // console.log(users)
    //     res.json({ message: 'This is the users route' });
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        const user = await userService.editUser(req.params.id, req.body);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
