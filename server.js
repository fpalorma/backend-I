import express from "express";
import router from "./src/routers/index.router.js";
import morgan from "morgan";
import errorHandler from "./src/middleware/errorHandler.mid.js";
import pathHandler from "./src/middleware/pathHandler.mid.js";

try {
    const server = express()
    const port = 8000;
    const ready = () => console.log("Server ready on port: http://localhost:" + port);
    server.listen(port, ready);
    server.use(express.urlencoded({ extended: true }))
    server.use(express.json())
    server.use(morgan("dev"))
    server.use(router)
    server.use(errorHandler)
    server.use(pathHandler)
} catch (error) {
    console.log(error);
}