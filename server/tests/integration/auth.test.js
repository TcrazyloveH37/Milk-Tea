const request = require('supertest');
const { Category } = require('../../models/category.Model');
const { User } = require('../../models/user.Model');
let server;

describe('auth middeware', () => {
	let token;
	const exec = () => {
		return request(server)
			.post('/api/categories')
			.set('x-auth-token', token)
			.send({ name: 'category1' });
	};

	beforeEach(() => {
		server = require('../../index');
		token = new User({ isAdmin: true }).generateAuthToken();
	});

	afterEach(async () => {
		await Category.remove({});
		server.close();
	});

	it('should return 401 if no token is provided', async () => {
		token = '';
		const res = await exec();

		expect(res.status).toBe(401);
	});

	it('should return 400 if token is invalid', async () => {
		token = 'a';
		const res = await exec();

		expect(res.status).toBe(400);
	});

	it('should return 200 if token is valid', async () => {
		const res = await exec();

		expect(res.status).toBe(200);
	});
});
