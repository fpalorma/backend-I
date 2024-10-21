import User from "../models/users.model.js"

class UsersMongoManager {

    async read(filter) {
        try {
            const all = await User.find(filter).lean()
            return all
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async create(data) {
        try {
            const one = await User.create(data)
            return one
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async readOne(uid) {
        try {
            const readOne = await User.findOne({_id:uid}).lean()
            return readOne
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async readByEmail(email) {
        try {
            const one = await User.findOne({ email: email }).lean();
            return one;
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async update(uid, data) {
        try {
            const opts = { new: true }
            const one = await User.findByIdAndUpdate(uid, data, opts)
            return one
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async delete(uid) {
        try {
            const user = await User.findByIdAndDelete(uid);
            return user
        } catch (error) {
            console.log(error);
            throw error
        }
    }
};

const usersMongoManager = new UsersMongoManager()

export default usersMongoManager