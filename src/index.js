const express = require('express');
const port = 3000;
const path = require('path');
const app = express();
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const route = require('./routes');
//config static folder
     app.use(express.static(path.join(__dirname, 'public')));
//use morgan to tracking request form client
app.use(morgan('combined'));
app.engine('hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', 'hbs');
         app.set('views', path.join(__dirname, 'resources\\views'));

//Route init add comment
                       route(app);

          app.listen(port, () => {});
