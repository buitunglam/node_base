const Course = require('../models/Course');
const { multipleMongoose } = require('../../util/mongoose');
class MeController {
    // GET /new
    index(req, res) {
        res.render('news');
    }

    // GET list course /stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}).sortTable(req), Course.countDeleted()])
            .then(([courses, itemDeleted]) => {
                res.render('me/stored-courses', {
                    courses: multipleMongoose(courses),
                    itemDeleted
                })
            })

        // Course.countDeleted().then(itemDeleted => {
        //     console.log('itemDeleted..', itemDeleted);
        // })

        // Course.find({})
        //     .then((courses) => res.render('me/stored-courses', {
        //         courses: multipleMongoose(courses)
        //     }))
        //     .catch(next);
    }

    // GET trash 
    trashCourses(erq, res, next) {
        Course.findDeleted({})
            .then((courses) => {
                let coursesDeleted = courses.filter(item => item.deleted) 
                res.render('me/trash-courses', {
                    courses: multipleMongoose(coursesDeleted)
                })
            })
            .catch(next);
    }
}

module.exports = new MeController();
