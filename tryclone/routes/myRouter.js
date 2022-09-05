const express = require('express');
const router = express.Router();

// use model
// it show in mongo when set this to use
const Product = require('../models/products')

// use multer upload file
const multer = require('multer')

// set path to get file
const storage = multer.diskStorage({

    // postion that set file
    // cb is callback fucntion
    destination : function(rq, res, cb){
        
        // for upload to show file
        // position that file is arrive
        cb(null, './public/images/products') 
    },

    // set file name
    filename : function(rq, res, cb){
        
        // set file name by date for non duplicate file name
        cb(null, Date.now() + ".jpg")
    },
})

// start to upload 
const upload = multer({
    storage : storage
})

// set route to show of the ejs views

// send data
// use get only query string not use to send data because is danger and not suitable in sensitive data
// post send data and hide it together 

// get data
// use action="path" of file of data that are send from express

// index page
router.get('/', (req, res)=>{

    // real product find all product and send it to index.ejs
    Product.find().exec((err, doc)=>{
        res.render('index', {product : doc})
    })
})

// form page
router.get('/add-product', (req, res)=>{

    res.render('form')
})

// manage page
router.get('/manage', (req, res)=>{
 
    // real product find all product and send it to index.ejs
    // use data to manage 
    Product.find().exec((err, doc)=>{
        res.render('manage', {product : doc})
    })
})

// delete page
router.get('/delete/:id', (req, res)=>{
 
    // show id that want to delete
    console.log("delete id : ", req.params.id);

    // delete data use id to delete
    Product.findByIdAndDelete(req.params.id, {useFindAndModify : false}).exec(err=>{
        if (err) console.log(err);
        res.redirect('/manage')
    })
})

// set up data after get it from form 
// if use get when send data that show at url 
// should use post instead of get

router.post('/insert', upload.single("image"), (req, res)=>{

    console.log(req.file);

    // show object after get data that show json
    // get use req.query

    // post use req.body and follow by name, price image or anything that set in ejs from
    // create object product
    let data = new Product({
        name : req.body.name,
        price : req.body.price,
        image : req.file.filename,
        description : req.body.description
    })

    // save data to database fucntion import from model/products.js
    Product.saveProduct(data, (err)=>{
        if (err) console.log(err);

        res.redirect('/');
    })

    // console.log(data);
})

// each product that go to by id
router.get('/:id', (req, res)=>{
    // id page from id in database
    const product_id = req.params.id;
    console.log(product_id);

    // find that id are equal in product just only one
    Product.findOne({_id : product_id}).exec((err, doc)=>{
        console.log(doc);
        if (err) console.log(err);
        // res.render('product')
    })
    
})


module.exports = router