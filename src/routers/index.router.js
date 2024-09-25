import { Router } from 'express';
import apiRouter from './api/index.api.js';

const router = Router();

router.use("/api", apiRouter)
router.get("/", (req, res) => {
    try {
        return res.status(200).json({
            message: "Welcome"
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Fatal Error" });
    }
});


export default router