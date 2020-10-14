class NewController {
    // GET /new
    index(req, res) {
        res.render('news');
    }

    // GET detail
    show(req, res) {
        res.send('new details');
    }
}

module.exports = new NewController();
