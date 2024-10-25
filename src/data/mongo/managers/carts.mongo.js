import Cart from "../models/carts.model.js";
import { Types } from "mongoose";


class CartsMongoManager {
    async read(filter) {
        try {
            const all = await Cart.find(filter).lean()
            return all
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async create(data) {
        try {
            const one = await Cart.create(data)
            return one

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async readOne(cid) {
        try {
            const readOne = await Cart.findOne({_id:cid}).lean()
            return readOne
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async update(cid, data) {
        try {
            const opts = { new: true }
            const one = await Cart.findOneAndUpdate({_id:cid}, data, opts)
            return one
        } catch (error) {
            throw error
        }
    }

    async delete(cid) {
        try {
            const prod = await Cart.findByIdAndDelete(cid);
            return prod
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async calculateTotal(id){
        try {
            const total = await Cart.aggregate([

                {$match: { user_id: new Types.ObjectId(id) }},
                {$lookup: { 
                    foreignField:"_id",
                    from:"products",
                    localField:"product_id",
                    as:"product_id"
                }},
                {$replaceRoot: {
                    newRoot: {
                        $mergeObjects:[
                            {$arrayElemAt:["$product_id", 0]},
                            "$$ROOT"
                        ]
                    }
                }},
                {$set:{subtotal:{$multiply:["$quantity", "$price"]}}},
                {$group: {_id: "$user_id", total: {$sum:"$subtotal"}}},
                {$project: {_id: 0,user_id:"$_id", total: "$total", date: new Date()}},
                {$lookup: { 
                    foreignField:"_id",
                    from:"users",
                    localField:"user_id",
                    as:"user_id"
                }},
                {$replaceRoot: {
                    newRoot: {
                        $mergeObjects:[
                            {$arrayElemAt:["$user_id", 0]},
                            "$$ROOT"
                        ]
                    }
                }},
                {$project: {_id: 0,user_id:0, password:0, role:0, __v:0, photo:0}}
            ])
            return total
        } catch (error) {
            throw error
        }
    }
}

const cartsMongoManager = new CartsMongoManager()
export default cartsMongoManager