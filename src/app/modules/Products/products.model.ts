// import { Schema, model } from 'mongoose';

import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./products.interface";

// const variantSchema = new Schema({
//     type: { type: String, required: true },
//     value: { type: String, required: true }
// });

// const inventorySchema = new Schema({
//     quantity: { type: Number, required: true },
//     inStock: { type: Boolean, required: true }
// });

// const productSchema = new Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     category: { type: String, required: true },
//     tags: [String],
//     variants: [variantSchema],
//     inventory: { type: inventorySchema, required: true }
// });

// const Product = model('Product', productSchema);

// export default Product;




export const variantSchema = new Schema<TVariant>({
    type: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

export const inventorySchema = new Schema<TInventory>({
    quantity: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true
    }
});

export const productSchema = new Schema<TProduct>({
    name: {
        type: String,
        required: [true , 'name is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    category: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
    variants: [variantSchema],
    inventory: inventorySchema
});

export const Product =model<TProduct>('Product', productSchema);