import User from "../models/userModel.js";
import bcrypt from "bcrypt";
const userRepository = {
  getUserById: async (userId) => {
    try {
      const User = await User.findById(userId);
      return User;
    } catch (error) {
      console.error(error);
      throw new Error("Fail to get user by ID");
    }
  },
};
const login = ({ email, password }) => {
  console.log(`Email: ${email}, Password: ${password}`);
};

const register = async ({ name, email, password, phoneNumber, address }) => {
  const userExisting = await User.findOne({ email }).exec();
  if (userExisting) {
    throw new Error("User already exists");
  }
  //Mã hóa mật khẩu
  const hashPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SECRET_KEY)
  );
  // Create a new user

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    phoneNumber,
    address,
  });
  // Save the user to the database

  // Optionally, you can return the newly created user object
  return newUser;
};

// const getAllUser = async () => {
//   try {
//   } catch (error) {
//     console.log();
//   }
// };

// const createUser = async (userData) => {
//   try {
//     const createdUser = await User.create(userData);
//     return createdUser;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to create a new user");
//   }
// };

export default {
  login,
  register,
 
};
