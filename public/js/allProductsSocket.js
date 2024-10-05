const socket = io();

document.querySelector("#filterByCategory").addEventListener("change", () => {
    const selectedCategory = document.querySelector("#filterByCategory").value;
    socket.emit("search products", selectedCategory);
});

socket.on("products filtered", (products) => {
    const productList = products.map(product => `
            <li class="list-group-item"><a class="product" href="/products/${product.id}">${product.title}</a></li>

    `).join("");
    document.querySelector("ul").innerHTML = productList; // Actualizar el contenido de la sección de productos
});