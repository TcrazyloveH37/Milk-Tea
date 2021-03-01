const products = require('./products.Route');
const categories = require('./categories.Route');
const trash = require('./trash.Route');

function route(app) {
	app.use('/api/products', products);
	app.use('/api/categories', categories);
	app.use('/api/trash', trash);
}

module.exports = route;
