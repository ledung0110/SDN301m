import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

//LOGIN
const login = async ({ email, password }) => {
  const userExisting = await User.findOne({ email }).exec();
  if (userExisting) {
    const isMatch = bcrypt.compare(password, userExisting.password);
    if (isMatch == true) {
      //Taoj access = token jwt
      const accessToken = jwt.sign(
        {
          data: userExisting,
        },
        process.env.SECRET_KEY_JWT,
        {
          expiresIn: "2 day",
        }
      );
      return {
        ...userExisting.toObject(),
        password: "Not show",
        token: accessToken,
      };
    } else {
      throw new Error("Email password incorrect");
    }
  } else {
    throw new Error("User not exist");
  }
  //console.log(`Email: ${email}, Password: ${password}`);
};

//REGISTER

const register = async ({ name, email, password, phoneNumber, address }) => {
  const userExisting = await User.findOne({ email }).exec();
  console.log(userExisting);
  if (userExisting) {
    throw new Error("Email đã tồn tại");
  }

  const secretKey = process.env.SECRET_KEY;

  const passwordWithKey = password + secretKey;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hashPassword = await bcrypt.hash(passwordWithKey, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    phoneNumber,
    address,
  });
  return {
    ...newUser._doc,
    password: "Not Show",
  };
};

//UPDATE

const updateUser = async (id, updateFields) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      updateFields,
      { new: true } // To return the updated document
    );

    if (!updatedUser) {
      return null; // User not found
    }

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw new Error("Update user failed");
  }
};

//DELETE

const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: id });

    if (!deletedUser) {
      return null; // User not found
    }

    return deletedUser;
  } catch (error) {
    console.error(error);
    throw new Error("Delete user failed");
  }
};


//GET ALL

const getAllUsers = async () => {
  try {
    // Use Mongoose to retrieve all users
    const users = await User.find({});

    if (!users) {
      return null; // No users found
    }
    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Get all users failed");
  }
};
const getById= async()=>{
  
}

export default {
  login,
  register,
  updateUser,
  deleteUser,
  getAllUsers,
};
