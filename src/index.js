const express = require('express');
const port = 3000;
const path = require('path');
const app = express();
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const sortMiddleWare = require('./app/middleware/SortMiddleware');
//config static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'))
//use morgan to tracking request form client
// app.use(morgan('combined'));
app.use(sortMiddleWare);
app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: require('./app/helpers/handleBar')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
db.connect();
//Route init
route(app);


app.listen(port, () => { });
