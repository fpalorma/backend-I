import cartsMongoManager from "../data/mongo/managers/carts.mongo.js";

async function readAllCarts(req, res, next) {
    try {
        let filter = {};
        if (req.query.user_id) {
            filter.user_id = req.query.user_id;
        }
        const responseMongo = await cartsMongoManager.read(filter)
        if (responseMongo.length > 0) {
            return res.status(200).json({ responseMongo })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404;
            throw error
        }
    } catch (error) {
        return next(error)
    }
};

async function getCart(req, res, next) {
    try {
        const { cid } = req.params;
        const response = await cartsMongoManager.readOne(cid)
        if (response) {
            return res.status(200).json({ response })
        } else {
            const error = new Error("PRODUCT NOT FOUND")
            error.statusCode = 404;
            throw error
        }

    } catch (error) {
        return next(error)
    }
};

async function create(req, res, next) {
    try {
        let data = req.body

        const responseManager = await cartsMongoManager.create(data)
        return res.status(201).json({ message: "Cart created", response: responseManager })

    } catch (error) {
        return next(error)
    }
};

async function update(req, res, next) {
    try {
        const { cid } = req.params;
        const newData = req.body;
        const responseManager = await cartsMongoManager.update(cid, newData);
        if (!responseManager) {
            const error = new Error(`Cart with id ${cid} doesnt exists`)
            error.statusCode = 404;
            throw error
        }
        return res.status(200).json({ message: "Cart updated", response: responseManager })
    } catch (error) {
        return next(error)
    }
};

async function deleteCart(req, res, next) {
    try {
        const { cid } = req.params;
        const responseManager = await cartsMongoManager.delete(cid);
        if (!responseManager) {
            const error = new Error(`Cart with id ${cid} not found`)
            error.statusCode = 404;
            throw error
        };
        return res.status(200).json({ message: "Cart deleted", response: responseManager })

    } catch (error) {
        return next(error)
    }
}
async function calculateTotal(req, res, next){
    try {
        const { uid } = req.params;
        const response = await cartsMongoManager.calculateTotal(uid)
        return res.status(200).json({response})
    } catch (error) {
        return next(error)
    }
}
async function cartsView(req, res, next) {
    try {
        let filter = {};
        if (req.query.user_id) {
            filter.user_id = req.query.user_id;
        }
        const responseMongo = await cartsMongoManager.read(filter)
        console.log(responseMongo);
        if (responseMongo) {
            return res.render("carts", { data: responseMongo })
        } else {
            const error = new Error("CART NOT FOUND")
            error.statusCode = 404;
            throw error
        }

    } catch (error) {
        return next(error)
    }
}


export { readAllCarts, getCart, create, update, deleteCart, calculateTotal,cartsView }