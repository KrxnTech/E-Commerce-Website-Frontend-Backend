const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

// ADD TO CART
router.post('/', cartController.addToCart)

// TO SHOW ALL ITEMS FROM THE CART
router.get('/', cartController.getCartItems)

// UPDATE THE QUANTITY OF THE PRODUCT WHICH IS ALREADY IN THE CART
router.put('/:id', cartController.updateCartItem)

// DELETE THE PRODUCT FROM THE CART BY TRACKING THE ID OF THE PRODUCT WHICH IS GIVEN BY THE CART 
router.delete('/:id', cartController.deleteCartItem)


module.exports = router
