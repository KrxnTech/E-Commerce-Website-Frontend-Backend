const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// PRODUCT ROUTES
router.get('/', productController.getAllProducts); // READ ALL - FETCH ALL PRODUCTS
router.get('/:id', productController.getProductById); // READ ONE - FETCH ONE PRODUCT BY ID 
router.post('/', productController.createProduct); // CREATE - ADD NEW PRODUCT
router.put('/:id', productController.updateProduct); // UPDATE - EDIT EXISTING PRODUCT
router.delete('/:id', productController.deleteProduct); // DELETE - REMOVE PRODUCT

module.exports = router;
