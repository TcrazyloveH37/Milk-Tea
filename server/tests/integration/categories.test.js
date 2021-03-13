const mongoose = require('mongoose');
const request = require('supertest');
const { Category } = require('../../models/category.Model');
const { User } = require('../../models/user.Model');
let server;

describe('/api/categories', () => {
	beforeEach(() => {
		server = require('../../index');
	});

	afterEach(async () => {
		server.close();
		await Category.remove({});
	});

	describe('GET /', () => {
		it('should return all categories', async () => {
			await Category.collection.insertMany([ { name: 'category1' }, { name: 'category2' } ]);
			//
			const res = await request(server).get('/api/categories');

			expect(res.status).toBe(200);
			expect(res.body.length).toBe(2);
			expect(res.body.some(c => c.name === 'category1')).toBeTruthy();
			expect(res.body.some(c => c.name === 'category2')).toBeTruthy();
		});
	});

	describe('GET /:_id', () => {
		it('should return a category if a valid id is passed', async () => {
			const category = new Category({ name: 'category1' });
			await category.save();

			const res = await request(server).get('/api/categories/' + category._id);

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('name', category.name);
		});

		it('should return 404 if invalid id is passed', async () => {
			const res = await request(server).get('/api/categories/1');

			expect(res.status).toBe(404);
		});

		it('should return 400 if no category with the given id exists', async () => {
			const _id = mongoose.Types.ObjectId();
			const res = await request(server).get('/api/categories/' + _id);

			expect(res.status).toBe(400);
		});
	});

	describe('POST /', () => {
		// Define the happy path, and then in each test, we change
		// one parameter that clearly aligns with the name of the test.
		let token;
		let name;

		const exec = async () => {
			return await request(server)
				.post('/api/categories')
				.set('x-auth-token', token)
				.send({ name });
		};

		beforeEach(() => {
			token = new User({ isAdmin: true }).generateAuthToken();
			name = 'huy';
		});

		it('should return 401 if client is not logged in', async () => {
			token = '';

			const res = await exec();
			expect(res.status).toBe(401);
		});

		it('should return 400 if category is no have name', async () => {
			name = '';

			const res = await exec();
			expect(res.status).toBe(400);
		});

		it('should return 400 if category is more 50 characters', async () => {
			name = new Array(52).join('a');

			const res = await exec();
			expect(res.status).toBe(400);
		});

		it('should save the genre if it is valid', async () => {
			await exec();

			const category = await Category.find({ name: 'huy' });
			expect(category).not.toBeNull();
		});

		it('should return the genre if it is valid', async () => {
			const res = await exec();
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('name', 'huy');
		});
	});
});
