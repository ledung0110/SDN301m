// // const addProduct = 
// import Product from "../models/productModel.js";

// const productRepository = {
//   getAllProducts: async () => {
//     try {
//       const products = await Product.find();
//       return products;
//     } catch (error) {
//       console.error(error);
//       throw new Error("Failed to fetch products");
//     }
//   },

//   getProductById: async (productId) => {
//     try {
//       const product = await Product.findById(productId);
//       return product;
//     } catch (error) {
//       console.error(error);
//       throw new Error("Failed to fetch product by ID");
//     }
//   },

//   createProduct: async (productData) => {
//     try {
//       const createdProduct = await Product.create(productData);
//       return createdProduct;
//     } catch (error) {
//       console.error(error);
//       throw new Error("Failed to create a new product");
//     }
//   },
// };

// export default productRepository;