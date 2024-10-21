// import productsManager from "../data/fs/products.manager.js"
import mongoose from "mongoose";
import productsMongoManager from "../data/mongo/managers/products.mongo.js";

async function readAllProds(req, res, next) {
    try {
        let filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }
        const responseMongo = await productsMongoManager.read(filter)
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

async function getProduct(req, res, next) {
    try {
        const { pid } = req.params;
        const response = await productsMongoManager.readOne(pid)
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

        const responseManager = await productsMongoManager.create(data)
        return res.status(201).json({ message: "Product created", response: responseManager })

    } catch (error) {
        return next(error)
    }
};

async function update(req, res, next) {
    try {
        const { pid } = req.params;
        const newData = req.body;
        const responseManager = await productsMongoManager.update(pid, newData);
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
        const responseManager = await productsMongoManager.delete(pid);
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

async function showProducts(req, res, next) {
    try {
        // let { category } = req.query;
        // let all;
        // if (!category) {
        //     all = await productsManager.read()
        // } else {
        //     all = await productsManager.read(category)
        // }
        //Veamos con mongo
        let filter = {};
        let all
        if (req.query.category) {
            filter.category = req.query.category;
        }
        all = await productsMongoManager.read(filter)

        if (all.length > 0) {
            return res.render("products", { data: all })
            //render nos permite poner un 2do parametro opcional para enviar datos a la plantilla de handlebars
        } else {
            const error = new Error("Products not found")
            error.statusCode = 404;
            throw error
        }

    } catch (error) {
        return next(error)
    }
}
async function showProductsInIndex(req, res, next) {
    try {
        // let { category } = req.query;
        // let all;
        // if (!category) {
        //     all = await productsManager.read()
        // } else {
        //     all = await productsManager.read(category)
        // }
        //Veamos con mongo
        let filter = {};
        let all
        if (req.query.category) {
            filter.category = req.query.category;
        }
        all = await productsMongoManager.read(filter)
        if (all.length > 0) {
            return res.render("index", { data: all })
        } else {
            const error = new Error("Products not found")
            error.statusCode = 404;
            throw error
        }

    } catch (error) {
        return next(error)
    }
}

async function showOneProduct(req, res, next) {
    try {
        // const { pid } = req.params;
        // const response = await productsManager.readOne(pid)
        //Mongo
        const { pid } = req.params;
        
        const response = await productsMongoManager.readOne(pid)
        if (response) {
            return res.render("oneProduct", { data: response })
        } else {
            const error = new Error("PRODUCT NOT FOUND")
            error.statusCode = 404;
            throw error
        }

    } catch (error) {
        return next(error)
    }
}
async function updateProductView(req, res, next) {
    try {
        const { pid } = req.params;
        const response = await productsMongoManager.readOne(pid)
        if (response) {
            return res.render("updateProduct", { data: response })
        } else {
            const error = new Error("PRODUCT NOT FOUND")
            error.statusCode = 404;
            throw error
        }

    } catch (error) {
        return next(error)
    }
}
const createProductView = (req, res, next) => {
    try {
        return res.render("createProduct")
    } catch (error) {
        return next(error)
    }
}

export { readAllProds, getProduct, create, update, deleteProd, showOneProduct, showProducts, showProductsInIndex, updateProductView, createProductView }