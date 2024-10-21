import Cart from "../models/carts.model.js";

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
}

const cartsMongoManager = new CartsMongoManager()
export default cartsMongoManager