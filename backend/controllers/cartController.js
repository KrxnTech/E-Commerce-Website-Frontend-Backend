const db = require('../models/db') // IMPORT DATABASE CONNECTION 


// ADD TO CART 
exports.addToCart = async (req, res) => {
    try {
        // WHEN USER CLICK ON ANY CARD IT WILL COME WITH THIS 2 
        const { product_id, quantity } = req.body
        const user_id = 1 // BY DEFEAULT USER ID IS 1 

        // CHECK IF ALREADY EXISTS IN CART
        const [existing] = await db.query(
            'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
            [user_id, product_id]
        )

        if (existing.length > 0) {
            // IF PRESENT THEN UPDATE QUANTITY 
            const NEWQ = existing[0].quantity + quantity

            await db.query(
                'UPDATE cart SET quantity = ? WHERE id = ?',
                [NEWQ, existing[0].id]
            )

            // DONE MESSAGE ✅
            return res.json({ message: 'CART UPDATED SUCCESSFULLY (QUANTITY INCREASED)' })
        }

        // ELSE INSERT NEW PRODUCT
        await db.query(
            'INSERT INTO cart (user_id , product_id , quantity) VALUES (? , ? , ?)',
            [user_id, product_id, quantity]
        )

        // DONE MESSAGE ✅
        res.json({ message: 'PRODUCT ADDED TO CART SUCCESSFULLY : )' })
    }
    // CATCH ERROR AND SHOW ERROR 
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'ERROR ADDING PRODUCT TO CART : (' })
    }
}

// API TO RETURN ALL ITEMS WHICH ARE INSIDE THE CART AND ITS OF ONE USER 
exports.getCartItems = async (req, res) => {
    try {

        const user_id = 1

        const query = `
            SELECT 
                cart.id,
                cart.product_id,
                cart.quantity,

                products.name,
                products.price,
                products.image
            FROM cart
            JOIN products ON cart.product_id = products.id
            WHERE cart.user_id = ?
        `

        const [rows] = await db.query(query, [user_id])

        res.json(rows) // SEND DATA TO FRONTEND

    } catch (err) {

        console.log(err)
        res.status(500).json({ message: 'Error fetching cart items' })
    }
}

// UPDATE CART ITEM QUANTITY
exports.updateCartItem = async (req, res) => {
    try {

        const cartId = req.params.id
        const { quantity } = req.body

        await db.query(
            'UPDATE cart SET quantity = ? WHERE id = ?',
            [quantity, cartId]
        )

        res.json({ message: 'Cart item updated successfully' })

    } catch (err) {

        console.log(err)
        res.status(500).json({ message: 'Error updating cart item' })
    }
}

// DELETE CART ITEM
exports.deleteCartItem = async (req, res) => {
    try {

        const cartId = req.params.id

        await db.query('DELETE FROM cart WHERE id = ?', [cartId])

        res.json({ message: 'Cart item deleted successfully' })

    } catch (err) {

        console.log(err)
        res.status(500).json({ message: 'Error deleting cart item' })
    }
}
