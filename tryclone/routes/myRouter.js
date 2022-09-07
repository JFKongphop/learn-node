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

// should classify get and post it can faster server

// get data
// use action="path" of file of data that are send from express

// how different render and redirect 
// redirect when go to file page | how to use redirect('/admin')
// render when go to that page in url | how to use render('admin')


// index page
router.get('/', (req, res)=>{

    // real product find all product and send it to index.ejs
    Product.find().exec((err, doc)=>{
        res.render('index', {product : doc})
    })
})

// form page
router.get('/add-product', (req, res)=>{

    // // cookie but change to use session
    // // go to admin to login before add product
    // // when go to add product that go to admin
    
    // // check cookie login is true that can go to form
    // // when ture show form to edit and add product
    // if(req.cookies.login){
    //     res.render('form')
    // }

    // // else show admin to login
    // else{
    //     res.render('admin')
    // }
    

    // // // use when created cookie
    // res.render('form')

    //--------------------------------------------------------------//

    // change to session
    if(req.session.login){
        res.render('form')
    }

    // else show admin to login
    else{
        res.render('admin')
    }
})

// manage page
router.get('/manage', (req, res)=>{

    // // cookie but change to use session
    // // check cookie login is true that can go to form
    // // when ture show manage page
    // if(req.cookies.login){

    //     // real product find all product and send it to index.ejs
    //     // use data to manage 
    //     Product.find().exec((err, doc)=>{
    //         res.render('manage', {product : doc})
    //     })
    // }

    // // show login page
    // else{
    //     res.render('admin')
    // }

    //--------------------------------------------------------------//

    // change to use session
    // show session
    // console.log("ID session : ", req.sessionID);
    // console.log("data session : ", req.session);

    // login session checking
    if(req.session.login){

        // real product find all product and send it to index.ejs
        // use data to manage 
        Product.find().exec((err, doc)=>{
            res.render('manage', {product : doc})
        })
    }

    // show login page
    else{
        res.render('admin')
    }
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

//logout to default page
// use get because not send data
router.get('/logout', (req, res)=>{

    // // logout by clear cookie
    // res.clearCookie('username')
    // res.clearCookie('password')
    // res.clearCookie('login')

    //--------------------------------------------------------------//

    // change to use session
    // destroy session to delete session for login
    req.session.destroy((err)=>{

        // when cookie is clear that go to manage
        res.redirect('/manage')
    })
})

// each product that go to by id
router.get('/:id', (req, res)=>{
    // id page from id in database
    // console.log(product_id);
    const product_id = req.params.id;
    

    // find that id are equal in product just only one
    Product.findOne({_id : product_id}).exec((err, doc)=>{
        console.log(doc);
        if (err) console.log(err);

        // when find that go to this page it show each item
        // when want to show it example product.name
        res.render('product', {product : doc})
    })
    
})

// set up data after get it from form 
// if use get when send data that show at url 
// should use post instead of get

router.post('/insert', upload.single("image"), (req, res)=>{

    // file element when upload
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

        // after save product go to home page
        res.redirect('/');
    })

    // console.log(data);
})



// edit data in this id
router.post('/edit', (req, res)=>{

    // get id when will edit
    const edit_id = req.body.edit_id
    console.log(edit_id);

    // find each item to edit data in it
    Product.findOne({_id : edit_id}).exec((err, doc)=>{
        // show when edit
        // console.log(doc);
        if (err) console.log(err);

        // send initial for edit in form
        res.render('edit', {product : doc})

        // when edited that send data back to this item
        // res.render('product', {product : doc})
    })
})

// update when edit done
router.post('/update', (req, res)=>{

    // update data in object that is new data from form edit
    // set update new id
    // not set new class but use same class and edit data
    const update_id = req.body.update_id
    let data = {
        name : req.body.name,
        price : req.body.price,
        description : req.body.description
    }

    // update data by id when update that go to manage
    Product.findByIdAndUpdate(update_id, data, {useFindAndModify : false}).exec(err=>{
        if (err) console.log(err);
        res.redirect('/manage')
    })
})

// login page
router.post('/login', (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    
    // cookie time 30s
    const timeExpire = 30000

    if(username === "admin" && password === "123"){

        // // change to use session
        // // create cookie when it can login
        // // set time cookie expire
        // res.cookie('username', username, {maxAge : timeExpire})
        // res.cookie('password', password, {maxAge : timeExpire})

        // // true admin login if false user login
        // res.cookie('login', true, {maxAge : timeExpire})

        //--------------------------------------------------------------//

        // change to use session because it mroe secure than cookie
        // create session
        req.session.username = username
        req.session.password = password
        req.session.login = true
        req.session.cookie.maxAge = timeExpire

        // go to manage both of cookie and session are use manage 
        res.redirect('/manage')
    }

    // when user login that go to 404
    else{
        res.render('404')
    }
})

module.exports = router