process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe.only('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());



  describe('/topics', () => {
    it('GET status:200 - bring back all the topics', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).to.be.an('array')
        })
    });

  });

  describe('/articles', () => {
    it('GET status 200 - bring back all the articles', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an('array')
        })
    })
    it('GET status:200 - is able to filter the articles by query author', () => {
      return request
        .get('/api/articles?author=icellusedkars')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].author).to.eql('icellusedkars')
        })
    })
    it('GET status:200 - is able to filter the articles by query the topic which is selected', () => {
      return request
        .get('/api/articles?topic=cats')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].topic).to.eql('cats')
        })
    })
    it('GET status:200 - is able to sort the artices by any valid column or defaults to the date', () => {
      return request
        .get('/api/articles?sort_by=article_id&order=asc')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].article_id).to.eql(1)
        })
    })
    it('GET status:200 - has all keys inclulding comment_count', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0]).to.contain.keys('article_id', 'author', 'title', 'topic', 'created_at', 'votes', 'comment_count')
        })
    })
    describe.only('/:article_id', () => {
      it('GET status 200 - returns articles depending on the id that has been insterted into the URL', () => {
        return request
          .get('/api/articles/2')
          .expect(200)
          .then(({ body }) => {
            expect(body.article[0].article_id).to.eql(2)
          })
      })
      it('PATCH status:200 - allows to add a new field to the current table', () => {
        return request
          .patch('/api/articles/2')
          .send({ inc_votes: 4 })
          .expect(200)
          .then(({ body }) => {
            expect(body.article[0].votes).to.equal(4)
          })
      })
      describe.only('/:article_id/comments', () => {
        it('GET status:200 - responds with an array of comments for the given article_id', () => {
          return request
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({ body }) => {
              expect(body.comments[0]).to.contain.keys('comment_id', 'votes', 'created_at', 'author', 'body')
            })
        })
        it('GET status:200 - responds a query sort_by which sorts the articles by any valid coumn or defaults to created_at', () => {
          return request
            .get('/api/articles/1/comments?sort_by=comment_id&order=asc')
            .expect(200)
            .then(({ body }) => {
              expect(body.comments[0].comment_id).to.equal(2)
            })
        })
        it('POST status:201 - responds with the posted object and accepts the properties username, body', () => {

          const postReq = {
            username: 'billy',
            body: 'THE BEST ARTICLE EVER MAN!!'
          }

          return request
            .post('/api/articles/1/comments')
            .send(postReq)
            .expect(201)
            .then(({ body }) => {
              expect(body.comments[0].comment_id).to.equal(2)
            })
        })

      })
    })
  })

});
