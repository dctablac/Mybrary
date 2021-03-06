if (process.env.NODE_ENV !== 'production') {    // if in development,
    require('dotenv').config();                 // load env dependencies
}

const express = require('express');  // import express
const app = express();               // app portion
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index.js');
const authorRouter = require('./routes/authors.js');
const bookRouter = require('./routes/books.js');

app.set('view engine', 'ejs');   // set view engine to ejs
app.set('views', __dirname + '/views');   // views folder in curr dir
app.set('layout', 'layouts/layout'); // helps for staple content shared amongst pages (like header and footer)
app.use(expressLayouts);    // using express layouts
app.use(methodOverride('_method')); // 
app.use(express.static('public'));   // styles, imgs, js
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const mongoose = require('mongoose');    // requires mongoose tool from npm
mongoose.connect(process.env.DATABASE_URL, {  // connect to Mongoose
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;    // connect to DB
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

app.listen(process.env.PORT || 3000);    // deployment: server tells us what port is used or defaults to 3000

