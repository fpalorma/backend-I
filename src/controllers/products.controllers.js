import productsManager from "../data/products.manager.js"

async function readAllProds(req, res, next) {
    try {
        let { category } = req.query;
        let response;
        if (!category) {
            response = await productsManager.read()
        } else {
            response = await productsManager.read(category)
        }
        if (response.length > 0) {
            return res.status(200).json({ response })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404;
            throw error
        }
    } catch (error) {
        return next(error)
    }
};

async function getProduct(req, res, next) {
    try {
        const { pid } = req.params;
        const response = await productsManager.readOne(pid)
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

        const responseManager = await productsManager.create(data)
        return res.status(201).json({ message: "Product created", response: responseManager })

    } catch (error) {
        return next(error)
    }
};

async function update(req, res, next) {
    try {
        const { pid } = req.params;
        const newData = req.body;
        const responseManager = await productsManager.update(pid, newData);
        if (!responseManager) {
            const error = new Error(`Product with id ${pid} doesnt exists`)
            error.statusCode = 404;
            throw error
        }
        return res.status(200).json({ message: "Product updated", response: responseManager })
    } catch (error) {
        return next(error)
    }
};

async function deleteProd(req, res, next) {
    try {
        const { pid } = req.params;
        const responseManager = await productsManager.delete(pid);
        if (!responseManager) {
            const error = new Error(`Product with id ${pid} not found`)
            error.statusCode = 404;
            throw error
        };
        return res.status(200).json({ message: "Product deleted", response: responseManager })

    } catch (error) {
        return next(error)
    }
}

export { readAllProds, getProduct, create, update, deleteProd }