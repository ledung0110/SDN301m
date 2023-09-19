import express from "express";
import { body, validationResult } from "express-validator";
import { userController } from "../controller/index.js";


const userRouter = express.Router();
//Activities => user object
userRouter.get("/", async (req, res) => {
  res.send("Get all users");
});
userRouter.get("/:id", async (req, res) => {
  res.send("Get users by userId");
});
//18/9/2023
userRouter.post("/register",
  body("email").isEmail().withMessage("Email Invalid format"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password length must be greater than 5"),
    userController.register
);
// userRouter.put('/login',async(req,res)=>{
//     res.send("Login user")
// })
userRouter.post(
  "/login",
  body("email").isEmail().withMessage("Email Invalid format"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password length must be greater than 5"),
  userController.login
);

//   async (req, res) => { //chuyen sang user(reponsitory)
//     //debugger
//     //res.send("Login user");
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//       return res.status(400).json({ error: error.array() });
//     }
//     res.send("Login successfully");
//   }

userRouter.put("/edit", async (req, res) => {
  res.send("Edit User");
});

export default userRouter;
