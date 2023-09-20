import mongoose from "mongoose";
//Ham ket noi CSDL
const connectDB = ()=>{
    try{
         const connection = mongoose.connect(process.env.MONGO_URI)
         console.log("Connect successfully to MongoDB")
         return connection
    }catch(error){
        throw new Error("Failed to connect DB")
    }
}
export default connectDB
