import usersManager from "../data/users.manager.js";
import productsManager from "../data/products.manager.js"

const socket = async (socket)=>{
    console.log(`Socket connected with ID: ${socket.id}`);
// Esta callback va a manejar todas las emisiones/recepciones del socket del backend
socket.on("new user", async data =>{
    
    const id = await usersManager.create(data)
    const allUsers = await usersManager.read()
    socket.emit("updated users", allUsers)
})
const allUsers = await usersManager.read()
socket.emit("updated users", allUsers)

socket.on("new product", async data=>{
    const id = await productsManager.create(data)
})

socket.on("erase product", async data=>{
    const id = await productsManager.delete(data)
    socket.emit("product erased", data);
})

socket.on("update product", async data=>{
    const id = await productsManager.update(data.id,data)
    const productUpdated = await productsManager.readOne(id)
    socket.emit("updated",productUpdated)
})

socket.on("search products", async data=>{
    const productsFiltered = await productsManager.read(data)
    socket.emit("products filtered", productsFiltered)
})

}
export default socket