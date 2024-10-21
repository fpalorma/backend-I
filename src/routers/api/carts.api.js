import { Router } from 'express';
import { readAllCarts, getCart, create, update, deleteCart } from "../../controllers/carts.controllers.js";



const cartsApiRouter = Router()

cartsApiRouter.get("/", readAllCarts)

cartsApiRouter.get("/:cid", getCart)

cartsApiRouter.post("/", create)

cartsApiRouter.put("/:cid", update)

cartsApiRouter.delete("/:cid", deleteCart)

export default cartsApiRouter