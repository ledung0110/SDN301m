// import { Schema } from "mongoose";

// const userSchema= Schema
// (
//     {
//         name:"Name 1",
//         age: 20,
//         email:"123@gmail.com",
//         school:"FPT University"
//     },
//     {
//         name:"Name 2",
//         age: 25,
//         email:"12345@gmail.com",
//         school:"FPT University"
//     },
//     {
//         name:"Name 3",
//         age: 20,
//         email:"123@gmail.com",
//         school:"FPT University"
//     }
    
// )
//     const user = model('user',userSchema)
//     export default userSchema

import { Schema, model } from "mongoose"

//Define user schema
const userSchema = Schema({
    name: {
        type: String,
        required:[true,"Please enter name."]
    },
    class: {
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true
    },
    
},
)
// Create product model
const User = model('User', userSchema)
export default User