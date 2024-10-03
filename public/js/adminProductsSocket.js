const socket = io()

const deleteProductBtns = document.querySelectorAll("#deleteProductBtn");

    deleteProductBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.currentTarget.value;
            socket.emit("erase product", id);
            alert("Product deleted")
           
        });
    });
    socket.on("product erased", (id) => {
        const productElement = document.getElementById(id);
        if (productElement) {
            productElement.remove(); // Elimina el elemento del DOM
        }
    });