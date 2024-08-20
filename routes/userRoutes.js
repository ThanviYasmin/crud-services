const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create User
router.post('/', async (req, res) => {
  const { username, password, active } = req.body;
  try {
    const newUser = new User({ username, password, active });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update User
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password, active } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, password, active },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete User
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
