import express from "express";
import { body, validationResult } from "express-validator";
import { userController } from "../controller/index.js";
import user from "../repositories/user.js";

const userRouter = express.Router();
//Activities => user object


//18/9/2023
userRouter.post(
  "/register",
  body("email").isEmail().withMessage("Email Invalid format"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password length must be greater than 5"),
  userController.register
);

userRouter.post(
  "/login",
  body("email").isEmail().withMessage("Email Invalid format"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password length must be greater than 5"),
  userController.login
);

userRouter.put(
  '/update/:id', // Include the user ID as a URL parameter

  userController.updateUser
);
// routes/userRoutes.js

userRouter.get('/all', userController.getAllUsers);

// routes/userRoutes.js

userRouter.delete('/delete/:id', userController.deleteUser);


export default userRouter;

//   async (req, res) => { //chuyen sang user(reponsitory)
//     //debugger
//     //res.send("Login user");
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//       return res.status(400).json({ error: error.array() });
//     }
//     res.send("Login successfully");
//   }

//homework
// userRouter.post("/update",
//   body("email").isEmail().withMessage("Email Invalid format"),
//   body("password")
//     .isLength({ min: 8 })
//     .withMessage("Password length must be greater than 5"),
//     user.updateUser
// );
// userRouter.put('/login',async(req,res)=>{
//     res.send("Login user")
// })

