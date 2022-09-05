const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes/myRouter')

  
// set up ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// encode after send data by POST to show 
app.use(express.urlencoded({extended : false}))

// set app to use router
app.use(router)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080, ()=>{
    console.log("Start server express at port 8080");
})

