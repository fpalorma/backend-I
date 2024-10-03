
const socket = io()

document.querySelector("#registerBtn").addEventListener("click", (e) => {
    
    try {
        e.preventDefault()
        const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const photo = "/public/assets/users/user-image.jpg"
    const role = 0
    const isOnline = false
    const userData = { name, email, password, photo, role, isOnline }
    if (!email || !password) {
        const error = new Error("email and passoword are required")
        error.statusCode = 400
        throw error
    }
    if (!photo) {
        userData.photo = "/public/assets/users/user-image.jpg"
    }
    if (!role) {
        userData.role = 0
    }
    if (!isOnline) {
        userData.isOnline = false
    }
    socket.emit("new user", userData)
        

    } catch (error) {
        alert(error.message)
        throw error
    }
})

//este archivo va a manejar todas las recepciones/emisiones del socket del front
socket.on("updated users", data => {
    data = data.map(each => `<div>${each.name} - ${each.email}</div>`).join("")
    document.querySelector("#update").innerHTML = data
})