import Product from "../models/products.model.js";

class ProductsMongoManager {
    async read(filter) {
        try {
            const all = await Product.find(filter).lean()
            return all
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async create(data) {
        try {
            const one = await Product.create(data)
            return one

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async readOne(pid) {
        try {
            const readOne = await Product.findOne({_id:pid}).lean()
            return readOne
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async update(pid, data) {
        try {
            const opts = { new: true }
            const one = await Product.findByIdAndUpdate(pid, data, opts)
            return one
        } catch (error) {
            throw error
        }
    }

    async delete(pid) {
        try {
            const prod = await Product.findByIdAndDelete(pid);
            return prod
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}

const productsMongoManager = new ProductsMongoManager()
export default productsMongoManager