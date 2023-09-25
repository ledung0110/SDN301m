import { body, validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";
import { User } from "../models/User.js";

//Tat car user
const getAllUser = async (req, res) => {
  try {
    const users = userRepository();
    return users;
  } catch (error) {}
};

//Find user by ID
const getUserById = async (req, res) => {
  const user = userRepository.getUserById(req);
};


//Login
const login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { email, password } = req.body;

  //Call reponsitory: User
  try{
    const loginUser = userRepository.login({email,password})
     res.status(200).json({ message: 
      "Login successfull",
      data: loginUser
     });
  //console.log(`Email: ${email}, Password: ${password}`);
  res.send("Login successfully");
  }catch(error){
    res.status.json({message: error.toString()})
  }
 
};

//18/9/2023-Register
const register = async (req, res) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
    const {
      name,
      email,
      password,
      phoneNumber,
      address
    } = req.body;
    try {
    const newUser = await userRepository.register({ name, email, password, phoneNumber, address });
    // Rest of your controller logic
    res.status(201).json({ message: newUser });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, phoneNumber, address } = req.body;
    const userId = req.params.id;
    const updatedUser = await userRepository.updateUser(
      userId, 
      { 
        name,
        email,
        phoneNumber,
        address
      });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(
      { 
      message: 'User updated successfully',
      data: updatedUser
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// controllers/userController.js

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Use Mongoose to find and remove the user by ID
    const deletedUser = await userRepository.deleteUser(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// controllers/userController.js

const getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from your database using the repository or MongoDB queries
    const users = await userRepository.getAllUsers();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Return the list of all users in the response
    return res.status(200).json({ message: 'List all user:', data: users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};





export default {
  getAllUsers,
  getUserById,
  login,
  register,
  updateUser,
  deleteUser
};