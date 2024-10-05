const socket = io()

document.querySelector("#loginBtn").addEventListener("click",(e)=>{
    try {
        e.preventDefault()
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginData = {email, password}
        if(!email){
            const error = new Error("Email is required")
            error.statusCode = 400
            throw error
        }
        if(!password){
            const error = new Error("Password is required")
            error.statusCode = 400
            throw error
        }
        socket.emit("login", loginData)
    } catch (error) {
        alert(error.message)
        throw error
    }
})

  socket.on('loginResponse', (data) => {
    if (data.success) {
      localStorage.setItem('token', data.token); 
      window.location.href = '/'; 
    } else {
      alert(data.message); 
    }
  });