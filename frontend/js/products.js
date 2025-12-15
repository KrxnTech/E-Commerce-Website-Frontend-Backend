// THIS SHIT IS GOING TO SHOW ALL PRODUCT BY ADDING SOME HTML ON THE PAGE 
async function loadProducts() {
    try {
        // CALLING API 
        const response = await fetch('http://localhost:5000/api/products');
        // SEND REPONSE TO JSON 
        const products = await response.json();

        // TAKE FROM HTML 
        const container = document.getElementById('product_container');
        // RECOVER THE HTML 
        container.innerHTML = "";

        // APPLY LOOP FOR EACH PRODUCT
        products.forEach(product => {

            // CREATE A ONE CARD DIV 
            const card = document.createElement('div');
            // ADD CLASS 
            card.classList.add("product_card");

            // CREATE A HTML FROM JS TO SHOW ON PAGE WITH NAME PRICE AND IMAGE 
            card.innerHTML = `
            <img src="./assets/images/${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}$</p>
            <div>
            <button>Add to Cart</button>
            <button>See Product Detail</button>
            </div>
            `;

            // APPEND IN THE CONTAINER BODY 
            container.appendChild(card);
        });

    } catch (err) {
        // ERROR HANLDING 
        console.log(err);
    }
}

loadProducts();


