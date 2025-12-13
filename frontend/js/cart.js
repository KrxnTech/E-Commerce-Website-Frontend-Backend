async function loadCart() {
    try {
        const response = await fetch("http://localhost:5000/api/cart")
        const CartItems = await response.json()
        const container = document.getElementById('cart_container')
        container.innerHTML = ""

        CartItems.forEach(CartItem => {
            const card = document.createElement('div')
            card.classList.add("Cart_Item_Card")

            // JS HTML TO SHOW DATA IN HTML FORM 
            card.innerHTML = `
                <img src="./assets/images/${CartItem.image}" alt="${CartItem.name}"
                    <h3 id="cart-item-name">${CartItem.name}</h3>
                    <p>Price: ₹${CartItem.price}</p>
                    <p>Quantity: ${CartItem.quantity}</p>
                "
            `
            container.appendChild(card)

        })
    } catch (err) {
        // CATCH THE ERROR 
        console.log(err)
    }
}

// FUNCTION CALL 
loadCart()
