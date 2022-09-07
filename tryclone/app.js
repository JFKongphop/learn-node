const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express();
const router = require('./routes/myRouter')


  
// set up ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// encode after send data by POST to show 
app.use(express.urlencoded({extended : false}))

// use cookieParser
app.use(cookieParser())

// use session and set properties
app.use(session({secret : "mysession", resave : false, saveUninitialized : false}))

// set app to use router
app.use(router)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080, ()=>{
    console.log("Start server express at port 8080");
})

