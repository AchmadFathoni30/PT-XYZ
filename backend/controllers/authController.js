const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByNik, createUser, getUserAll, updateUser, deleteUser } = require('../models/userModel.js');

const JWT_SECRET = process.env.JWT_SECRET || '9CBECC93BF42C';

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await getUserAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching all users:', error.message);
    res.status(500).json({ message: 'An error occurred while fetching all users', error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const { nik, name, email, position } = req.body;

  // Validate input
  if (!nik || !name || !email || !position) {
    return res.status(400).json({ message: 'All fields are required to update a user' });
  }

  try {
    const updatedUser = await updateUser(nik, name, email, position);
    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ message: 'An error occurred while updating the user', error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const { nik } = req.params;

  if (!nik) {
    return res.status(400).json({ message: 'NIK is required to delete the user.' });
  }

  try {
    const deletedUser = await deleteUser(nik);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ message: 'An error occurred while deleting the user', error: error.message });
  }
};

// Register User
exports.register = async (req, res) => {
  const { nik, name, email, password, position } = req.body;

  if (!nik || !name || !email || !password || !position) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingUser = await getUserByNik(nik);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(nik, name, email, hashedPassword, position);

    res.status(201).json({ message: 'User registered successfully.', newUser });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed.', error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  const { nik, password } = req.body;

  if (!nik || !password) {
    return res.status(400).json({ message: 'NIK and Password are required.' });
  }

  try {
    const user = await getUserByNik(nik);
    if (!user) return res.status(401).json({ message: 'Invalid NIK or Password.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid NIK or Password.' });

    const token = jwt.sign({ nik: user.nik }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed.', error: error.message });
  }
};
