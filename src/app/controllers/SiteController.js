const Course = require("../models/Course");
const {multipleMongoose} = require('../../util/mongoose');
class SiteController {
    // GET /new
    index(req, res, next) {
        Course.find({})
            .then(course => {
                res.render('home',  {courses: multipleMongoose(course)})
            })
            .catch(next)
    }

    // GET detail
    show(req, res) {
        res.send('search');
    }
}

module.exports = new SiteController();
