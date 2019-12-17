const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const productSchema =  new mongoose.Schema({
        "product": {
           "category": {type: String, required: true},
           "price": {type: Number, required: true},
           "name": {type: String, required: true},
           "instock": {type: String}
          }
});

module.exports = mongoose.model('Product', productSchema);