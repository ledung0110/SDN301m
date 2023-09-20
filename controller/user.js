import { body, validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";

const getAllUser = async (req, res) => {
  try {
    const users = userRepository();
    return users;
  } catch (error) {}
};

const getUserById = async (req, res) => {
  const user = userRepository.getUserById(req);
};

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
//18/9/2023
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

export default {
  getAllUser,
  getUserById,
  login,
  register,
};