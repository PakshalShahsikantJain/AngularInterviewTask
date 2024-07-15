const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productsSchema = new Schema({
    image : String,
    title : String,
    description : String,
    price : Number,
    ingredients : [String],
    usage : String
});

module.exports = mongoose.model('product',productsSchema,'products')