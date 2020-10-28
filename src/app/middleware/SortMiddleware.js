module.exports = function sortMiddleWare(req, res, next) {
    res.locals._sort = {
        enable: false,
        type: 'default',
    };
   
    if(req.query.hasOwnProperty('_sort')){
        Object.assign(res.locals._sort, {
            enable: true,
            type: req.query.type,
            column: req.query.column
        });
        console.log(req.query.type, res.locals._sort);
    }

    next();
}