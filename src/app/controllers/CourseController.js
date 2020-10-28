const Course = require("../models/Course");
const { mongooseToObject } = require('../../util/mongoose');
const { render } = require("node-sass");


class CourseController {
    // GET detail
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                // res.json({course});
                res.render('courses/course', { course: mongooseToObject(course) });
            })
            .catch(next);
    }

    // GET Create course 
    create(req, res, next) {
        res.render('courses/create');
    }

    // POST create course
    store(req, res, next) {
        const formData = { ...req.body };
        console.log('formData..', req.body);
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`
        const course = new Course(formData);
        course.save().then(() => {
            res.redirect('/me/stored/courses');
        });

        // res.send('Course save!!!');
    }

    //GET :id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => {
                console.log('course...', course, mongooseToObject(course));
                res.render('courses/edit', { course: mongooseToObject(course) })
            })
            .catch(next)
    }

    //PUT :id/
    update(req, res, next) {
        Course.updateOne({ id: req.params._id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //DELETE :id/
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // DELETE :id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // PATCH :id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // POST handle-form-action
    handleFormAction(req, res, next) {

        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            default:
                res.json({ message: 'Action is invalid' });
        }
    }

    // POST handleTrashFormAction
    handleTrashFormAction(req, res, next) {
        // res.json(req.body);
        switch (req.body.action) {
            case 'delete':
                Course.deleteOne({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
                break;
        }
    }

}

module.exports = new CourseController();
