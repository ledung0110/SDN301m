import express from "express"
import Product from "../models/productModel.js"

const productController={
    
    //function define product schema
    getAllProduct: async(req,res)=>{
        const p = new Product({
            name: "Product 1",
            quantity: 10,
            price:20.5,
            image:'logo.png'
        })
        const p1 = new Product({
            name: "Product 1",
            quantity: 10,
            price:20.5,
            image:'logo.png'
        })
        const list = [p]
            list.push(p1)

        // const products = await Product.list
        // if(!products){
        //   return  res.status(404).json({message:'Product not found'})
        // }
       
        res.status(200).json(list)
    }
}

export default productController;