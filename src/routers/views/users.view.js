import { Router } from 'express';
import { registerView } from '../../controllers/users.controllers.js';


const usersViewRouter = Router()

// Defino la lógica de vistas de los users
usersViewRouter.get("/register", registerView)
export default usersViewRouter