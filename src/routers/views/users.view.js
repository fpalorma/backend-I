import { Router } from 'express';
import { registerView, profileView } from '../../controllers/users.controllers.js';


const usersViewRouter = Router()

usersViewRouter.get("/register", registerView)
usersViewRouter.get("/login", (req, res)=>res.render("login"))
usersViewRouter.get("/:uid", profileView)


export default usersViewRouter