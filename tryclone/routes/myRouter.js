const express = require('express');
// const path = require('path');
const router = express.Router();

// set route to show of the ejs views

// send data
// use get only query string not use to send data because is danger and not suitable in sensitive data
// post send data and hide it together 

// get data
// use action="path" of file of data that are send from express

// index page
router.get('/', (req, res)=>{
    const product = [
        {name : "Laptop", price : 25000, image : "images/products/product1.png"},
        {name : "Hoodie", price : 2000, image : "images/products/product2.png"},
        {name : "Headphone", price : 5000, image : "images/products/product3.png"}
    ]   
    res.render('index', {product : product})
})

// form page
router.get('/addForm', (req, res)=>{
 
    res.render('form')
})

// manage page
router.get('/manage', (req, res)=>{
 
    res.render('manage')
})

// set up data after get it from form 
// if use get when send data that show at url 
// should use post instead of get

router.post('/insert', (req, res)=>{
    // show object after get data that show json
    // get use req.query
    // post use req.body
    console.log(req.body);

    // when send data back to this page
    res.render('form')
})

module.exports = router