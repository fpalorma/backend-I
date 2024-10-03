import { Router } from 'express';
import { showProducts, showOneProduct, createProductView, updateProductView } from '../../controllers/products.controllers.js';


const productsViewRouter = Router()

productsViewRouter.get("/", showProducts)
productsViewRouter.get("/admin", createProductView)
productsViewRouter.get("/update/:pid", updateProductView)
productsViewRouter.get("/:pid", showOneProduct)


export default productsViewRouter