const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Create a user (Sign Up)
router.post('/register', async (req, res) => {
    try {
        const { name, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hacher le mot de passe avant de le stocker
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created successfully', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Ne pas renvoyer les mots de passe
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user by id
router.put('/:id', async (req, res) => {
    try {
        const { name, password } = req.body;
        const updatedData = {};

        if (name) updatedData.name = name;
        if (password) updatedData.password = await bcrypt.hash(password, 10);

        const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete user by id
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
