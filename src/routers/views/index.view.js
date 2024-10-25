import { Router } from 'express'
import { showProductsInIndex, showpaginated } from '../../controllers/products.controllers.js';
import productsViewRouter from './products.view.js';
import usersViewRouter from './users.view.js';
import cartsViewRouter from './carts.view.js';


const viewRouter = Router()


viewRouter.get("/", showpaginated);
viewRouter.use("/products", productsViewRouter);
viewRouter.use("/users", usersViewRouter);
viewRouter.use("/carts", cartsViewRouter);


export default viewRouter