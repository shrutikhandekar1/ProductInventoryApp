const HttpError = require('../models/http-error');
const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const Product = require('../models/product');

let DUMMY_PRODUCTS = [
    {
        "id": 2,
        "product": {
           "productid": 1,
           "category": "abc",
           "price": 0,
           "name": "xyz",
           "instock": true
          }
        },
        {
            "id": 3,
            "product": {
               "productid": 3,
               "category": "ice",
               "price": 20,
               "name": "ice",
               "instock": true
              }
            }
    ];

const createProduct = async (req, res, next) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data', 422);
    }

    const { product } = req.body;
    
    const createdProduct = new Product({
        product: product
    });

    try{
        await createdProduct.save();
    }
    catch(e){
        console.error(e, e.stack);
        const error = new HttpError('Creating product failed. Please try again.', 500);
        return next(error);
    }
    res.status(201).json({message: "Product added", product: createdProduct.toObject( {getters : true} )});
}

const getAllProducts = async (req, res, next) => {
    
    let allProducts;
    try{
        allProducts = await Product.find();
    }
    catch {
        const error = new HttpError("Fetching products failed", 500);
        return next(error);
    }
    //res.json({allProducts: allProducts.map(allProducts => allProducts.toObject({getters: true}))});
    res.json(allProducts);

};

const deleteProduct = async (req, res, next) => {
    const productid = req.params.pid;
    
    let productToBeDeleted;

    try{
        productToBeDeleted = await Product.findById(productid);
    }catch(err){
        const error = new HttpError('Something wrong. Could not delete product.',500);
        return next(error);
    }

    try{
        await productToBeDeleted.remove();
    }catch(err){
        const error = new HttpError('Something wrong. Could not delete product.',500);
        return next(error);
    }

    res.status(200).json({message:'Product deleted'})
}

const updateProduct = async (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }


    const { product } = req.body;
    const productid = req.params.pid;

   
    let productToBeUpdated;

    try{
        productToBeUpdated = await Product.findById(productid);
    }catch(err) {
        const error = new HttpError('Something went wrong. Could not update products', 500);
        return next(error);
    }
    productToBeUpdated.product.name = product.name;
    productToBeUpdated.product.category = product.category;
    productToBeUpdated.product.price = product.price;
    productToBeUpdated.product.instock = product.instock;

    try{
        await productToBeUpdated.save();
    }catch(err){
        const error = new HttpError('Something went wrong. Could not update Products', 500);
        return next(error);
    }
    res.status(200).json({productToBeUpdated: productToBeUpdated.toObject( {getters : true})});

}

exports.getAllProducts = getAllProducts;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;
exports.createProduct = createProduct;