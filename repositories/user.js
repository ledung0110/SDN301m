import bcrypt from "bcrypt";
import {User} from "../models/User.js";
import  jwt  from "jsonwebtoken";
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
const login = async({ email, password }) => {
  const userExisting = await User.findOne({ email }).exec();
  
  if(userExisting){
    const isMatch = bcrypt.compare(password,userExisting.password)
    if(isMatch==true){
    //Taoj access = token jwt
    const accessToken= jwt.sign({
     data: userExisting
    },
process.env.SECRET_KEY_JWT,
{
expiresIn: "2 day"
}
    )
    return {
      ...userExisting.toObject(),
      password:'Not show',
      token: accessToken
   }
  }else{
    throw new Error('Email password incorrect')
  }
  }else{
    throw new Error('User not exist')
  }
  //console.log(`Email: ${email}, Password: ${password}`);
};

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

  // Tuỳ chọn, bạn có thể trả về đối tượng người dùng mới được tạo
  return {
    ...newUser._doc,
    password: 'Not Show'
  }
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