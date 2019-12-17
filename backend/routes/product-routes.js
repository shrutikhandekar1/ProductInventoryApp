const express = require('express');
const router = express.Router();
const {check} = require('express-validator'); //object destructuring to import only one method from express-validator
const createProduct = require('./create-product');
const deleteProduct = require('./delete-product');
const productController = require('../controllers/products-controller');


router.get('/get',  productController.getAllProducts);

router.post('/create', productController.createProduct);

router.patch('/update/:pid', productController.updateProduct);

router.delete('/delete/:pid', productController.deleteProduct);


module.exports = router;