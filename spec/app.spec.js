process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe('/api', () => {
  // beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/articles', () => {
    it('GET status:200', () => {
      return request
        .get('/api/articles')
        .expect(200)


    });
  });
});
