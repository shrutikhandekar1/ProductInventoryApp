const mongoose = require('mongoose');
const Product = require('./models/product');
const uuid = require('uuid/v4');

mongoose.set('useNewUrlParser', true);

mongoose.connect('mongodb+srv://Shruti:Shr1jay20ee@nodeproject-otgtx.mongodb.net/products_test?retryWrites=true&w=majority').then(() => {
    console.log('Connected to database!');
}).catch(()=>{
    console.log('Connection failed!');
});

const createProduct = async (req, res, next) => {
    console.log(req.body.product.name);
    const createdProduct = new Product({
        product: {
            productid: uuid(),
            name: req.body.product.name,
            category: req.body.product.category,
            price: req.body.product.price,
            instock: req.body.product.instock
        }
    });
    const result = await createdProduct.save();
    
   
    

    res.json(result);
};

const getProducts = async (req, res, next) => {
    const products = await Product.find().exec();
    res.json(products);
};


exports.createProduct = createProduct;
exports.getProducts = getProducts;
