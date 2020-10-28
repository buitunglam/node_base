const HandleBars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    sortTable: (field, sort) => {
        console.log(field, sort);
        const sortType = field === sort.column ? sort.type : 'default'
        const icons = {
            default: 'oi oi-elevator',
            asc: 'oi oi-sort-ascending',
            desc: 'oi oi-sort-descending'
        }

        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc'
        }

        const icon = icons[sortType];
        const type = types[sortType];
        const href = HandleBars.escapeExpression(`?_sort&column=${field}&type=${type}`);
        const output = `<a href="${href}"><span class="${icon}"></span></a>`
        console.log('outpu...', output);
        return new HandleBars.SafeString(output);
    }
}