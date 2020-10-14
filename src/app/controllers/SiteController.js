class SiteController {
    // GET /new
    index(req, res) {
        res.render('home');
    }

    // GET detail
    show(req, res) {
              res.send('search');
    }
}

module.exports = new SiteController();
