import { Schema, model } from "mongoose"

//Define product schema
const prodcutSchema = Schema({
    name: {
        type: String,
        required:[true,"Please enter product name."]
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: false
    }
    
},
{
    timestamp: true
}
)
// Create product model
const Product = model('Product', prodcutSchema)
export default Product