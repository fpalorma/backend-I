// import usersManager from "../data/fs/users.manager.js";
// import productsManager from "../data/fs/products.manager.js"
import jwt from 'jsonwebtoken';
import productsMongoManager from "../data/mongo/managers/products.mongo.js";
import usersMongoManager from "../data/mongo/managers/users.mongo.js";

const socket = async (socket) => {
    console.log(`Socket connected with ID: ${socket.id}`);
    socket.on("new user", async data => {

        const newUser = await usersMongoManager.create(data)
        
        socket.emit("updated users", newUser)
    })

    socket.on("new product", async data => {
        const id = await productsMongoManager.create(data)
    })

    socket.on("erase product", async data => {
        const id = await productsMongoManager.delete(data)
        socket.emit("product erased", data);
    })

    socket.on("update product", async data => {
        const id = await productsMongoManager.update(data.id, data)
        const productUpdated = await productsMongoManager.readOne(id)
        socket.emit("updated", productUpdated)
    })

    socket.on("search products", async data => {
        const productsFiltered = await productsMongoManager.read(data)
        socket.emit("products filtered", productsFiltered)
    })

    socket.on('login', async ({ email, password }) => {

        const user = await usersMongoManager.readByEmail(email);
        if (!user || password !== user.password) {
            socket.emit('loginResponse', { success: false, message: 'Email or password not found' });
            return;
        }

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const CLAVE = process.env.SECRET_KEY
        const token = jwt.sign(payload, CLAVE, { expiresIn: '1h' });

        socket.emit('loginResponse', { success: true, token, userId: user.id });
    });

}
export default socket