import { Schema, model, Document, Types } from 'mongoose';

export interface IOrder extends Document {
    email: string;
    productId: Types.ObjectId;
    price: number;
    quantity: number;
}

const orderSchema = new Schema<IOrder>({
    email: {
        type: String,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export const Order = model<IOrder>('Order', orderSchema);
