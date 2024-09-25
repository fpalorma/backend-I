function isUserValidData(req, res, next) {
    try {
        let { email, password, photo, role } = req.body
        if (!email || !password) {
            const error = new Error("email and passoword are required")
            error.statusCode = 400
            throw error
        }
        if (!photo) {
            req.body.photo = "user.jpg"
        }
        if (!role) {
            req.body.role = 0
        }
        return next()

    } catch (error) {
        throw error
    }
}

export default isUserValidData