const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

// ADD TO CART
router.post('/', cartController.addToCart)

// GET ALL CART ITEMS
router.get('/', cartController.getCartItems)

// UPDATE CART ITEM
router.put('/:id', cartController.updateCartItem)

// DELETE CART ITEM
router.delete('/:id', cartController.deleteCartItem)

module.exports = router
