import usersManager from "../data/users.manager.js"

async function readAllUsers(req, res, next) {
    try {
        let { role } = req.query;
        let response;
        if (!role) {
            response = await usersManager.read()
        } else {
            response = await usersManager.read(role)
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

async function getUser(req, res, next) {
    try {
        const { uid } = req.params;
        const response = await usersManager.readOne(uid)
        if (response) {
            return res.status(200).json({ response })
        } else {
            const error = new Error("USER NOT FOUND")
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

        const responseManager = await usersManager.create(data)
        return res.status(201).json({ message: "User created", response: responseManager })

    } catch (error) {
        return next(error)
    }
};

async function update(req, res, next) {
    try {
        const { uid } = req.params;
        const newData = req.body;
        const responseManager = await usersManager.update(uid, newData);
        if (!responseManager) {
            const error = new Error(`User with id ${uid} doesnt exists`)
            error.statusCode = 404;
            throw error
        }
        return res.status(200).json({ message: "User updated", response: responseManager })
    } catch (error) {
        return next(error)
    }
};

async function deleteUser(req, res, next) {
    try {
        const { uid } = req.params;
        const responseManager = await usersManager.delete(uid);
        if (!responseManager) {
            const error = new Error(`User with id ${uid} not found`)
            error.statusCode = 404;
            throw error
        };
        return res.status(200).json({ message: "User deleted", response: responseManager })

    } catch (error) {
        return next(error)
    }
}

export { readAllUsers, getUser, create, update, deleteUser }