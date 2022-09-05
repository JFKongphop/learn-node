// use mongoose
const mongoose = require('mongoose');

// connect monoDB
// if it not have document that create new
const dbUrl = 'mongodb://localhost:27017/productDB';
mongoose.connect(dbUrl, {

    useNewUrlParser : true,
    useUnifiedTopology : true 

}).catch(err=>console.log(err))

// design Schema
let productSchema = mongoose.Schema({

    name : String,
    price : Number,
    image : String,
    description : String

})

// build model
let Product = mongoose.model('products', productSchema)

// send out model
module.exports = Product

// design function for save data
module.exports.saveProduct = function(model, data){

    model.save(data)
}

