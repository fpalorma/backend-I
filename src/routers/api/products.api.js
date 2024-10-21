import { Router } from 'express';
import { readAllProds, getProduct, create, update, deleteProd, paginate } from "../../controllers/products.controllers.js";
import isValidData from '../../middleware/isValidData.mid.js';


const productsApiRouter = Router()

productsApiRouter.get("/", readAllProds)

productsApiRouter.get("/paginate", paginate)

productsApiRouter.get("/:pid", getProduct)

productsApiRouter.post("/", isValidData, create)

productsApiRouter.put("/:pid", update)

productsApiRouter.delete("/:pid", deleteProd)

export default productsApiRouter