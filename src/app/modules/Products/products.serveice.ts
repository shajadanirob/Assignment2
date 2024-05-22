/* eslint-disable @typescript-eslint/ban-types */

import { TProduct } from "./products.interface";
import { Product } from "./products.model";



const createProduct = async (payLoad : TProduct)=>{
    const result = await Product.create(payLoad);
    return result
}
const getAllProducts = async (searchTerm?: string) => {
    try {
        let query = {};
        if (searchTerm) {
            query = {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } },
                    { category: { $regex: searchTerm, $options: 'i' } },
                    { 'tags': { $regex: searchTerm, $options: 'i' } }
                ]
            };
        }
        const products = await Product.find(query);
        return products;
    } catch (error) {
        throw new Error(`Error fetching products: ${error}`);
    }
};

const getSingleProducts = async (id : String)=>{
    const result = await Product.findById(id);
    return result
}






const updateProducts = async (id : String ,updatedProduct : TProduct)=>{
    try {
        const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error(`Error updating product: ${error}`);
    }

}
const deleteProducts = async (id : String )=>{
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error(`Error updating product: ${error}`);
    }

}











export const ProductService ={
    createProduct,
    getAllProducts,
    getSingleProducts,
    updateProducts,
    deleteProducts,
    // searchProducts
}