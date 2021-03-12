const products = require('./products.Route');
const categories = require('./categories.Route');
const users = require('./users.Route');
const auth = require('./auth.Route');

function route(app) {
	app.use('/api/products', products);
	app.use('/api/categories', categories);
	app.use('/api/users', users);
	app.use('/api/auth', auth);
}

module.exports = route;
