process.env.NODE_ENV = 'test';
const chai = require("chai");

const { expect } = require('chai');
const supertest = require('supertest');
const chaiSorted = require("chai-sorted");
const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

chai.use(chaiSorted)

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
    it('GET status:404 - responds with route not found if an invalid route has been entered into the url', () => {
      return request
        .get('/api/mop')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql('Route Not Found')
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
    it('GET status 200 - able to limit the page to show an amount of articles given in the query', () => {
      return request
        .get('/api/articles?limit=10')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles.length).to.equal(10)
        })
    })
    it('GET status 200 - able to limit the page to show an amount of articles given in the query', () => {
      return request
        .get('/api/articles?p=1')
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
          expect(body.articles[0].author).equal('icellusedkars')
        })
    })
    it('GET status:404 - responds with author not found or page not found when an invalid author is entered into the query', () => {
      return request
        .get('/api/articles?author=opopopopopo')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('page not found')
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
    it('GET status:404-responds with page not found if the topic is invalid', () => {
      return request
        .get('/api/articles?topic=bats')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('page not found')
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
    it('GET status:400 - responds with id not found if the queries column does not exist', () => {
      return request
        .get('/api/articles?sort_by=mother_id&order=asc')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql('bad request')
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
    describe('/:article_id', () => {
      it('GET status 200 - returns articles depending on the id that has been insterted into the URL', () => {
        return request
          .get('/api/articles/2')
          .expect(200)
          .then(({ body }) => {
            expect(body.article.article_id).to.eql(2)
          })
      })
      describe('/:article_id', () => {
        it('GET status 404 - responds with id not found if passed an invalid article_id', () => {
          return request
            .get('/api/articles/200000')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.eql('id not found')
            })
        })
        describe('/articles', () => {
          it('POST status 200 - responds with the added article if a new article has been added', () => {
            const postReq = {
              author: 'icellusedkars',
              body: 'jelly is nice',
              title: 'best ever article',
              topic: 'mitch'

            }
            return request
              .post('/api/articles')
              .send(postReq)
              .expect(200)
              .then(({ body }) => {
                expect(body.article[0].body).to.eql('jelly is nice')
              })
          })
          it('DELETE status:204 - responds with the status 204 and no content', () => {
            return request
              .delete('/api/articles/1')
              .expect(204)

          })
          it('PATCH status:200 - allows incrementation to the votes column for a specific article', () => {
            return request
              .patch('/api/articles/2')
              .send({ inc_votes: 4 })
              .expect(200)
              .then(({ body }) => {
                expect(body.article.votes).to.equal(4)
              })
          })
          it('PATCH status:400 - responds with 400 bad request if an invalid input has been placed for the patch request', () => {
            return request
              .patch('/api/articles/2')
              .send({ inc_votes: 'g' })
              .expect(400)
              .then(({ body }) => {

                expect(body.msg).to.eql('bad request')
              })
          })
          it('PATCH status:400 - responds with 400 bad request if an invalid input has been placed for the patch request empty', () => {
            return request
              .patch('/api/articles/2')
              .send({})
              .expect(400)
              .then(({ body }) => {

                expect(body.msg).to.eql('bad request')
              })
          })
          describe('/:article_id/comments', () => {
            it('GET status:200 - responds with an array of comments for the given article_id', () => {
              return request
                .get('/api/articles/1/comments')
                .expect(200)
                .then(({ body }) => {
                  expect(body.comments[0]).to.contain.keys('comment_id', 'votes', 'created_at', 'author', 'body')
                })
            })
            it('GET status:200 - responds with an array of comments with a given limit in the query', () => {
              return request
                .get('/api/articles/1/comments')
                .expect(200)
                .then(({ body }) => {
                  expect(body.comments.length)
                    .to.equal(10)
                })
            })
            it('GET status:400 - responds with 400 if given a incorrect article_id to search with', () => {
              return request
                .get('/api/articles/656/comments')
                .expect(400)
                .then(({ body }) => {
                  expect(body.msg).to.eql('invalid id')
                })
            })
            it('GET status:200 - responds a query sort_by which sorts the articles by any valid coumn or defaults to created_at', () => {
              return request
                .get('/api/articles/1/comments?sort_by=comment_id&order=asc')
                .expect(200)
                .then(({ body }) => {
                  expect(body.comments).to.be.sortedBy("comment_id", { ascending: true })
                })
            })
            it('POST status:201 - responds with the posted object and accepts the properties username, body', () => {

              const postReq = {
                username: 'icellusedkars',
                body: 'THE BEST ARTICLE EVER MAN!!'
              }

              return request
                .post('/api/articles/1/comments')
                .send(postReq)
                .expect(201)
                .then(({ body }) => {
                  expect(body.comment.body).to.eql('THE BEST ARTICLE EVER MAN!!')
                })
            })
            it('POST status:400 - responds bad request if the value of body has been entered incorrectly', () => {

              const postReq = {
                username: 'icellused',
                body: 'THE BEST ARTICLE EVER MAN!!'
              }

              return request
                .post('/api/articles/1/comments')
                .send(postReq)
                .expect(400)
                .then(({ body }) => {
                  expect(body.msg).to.equal('bad request')
                })
            })
            it('POST status:400 - responds bad request if the KEY of body has been entered incorrectly', () => {

              const postReq = {
                userna: 'icellusedkars',
                body: 'THE BEST ARTICLE EVER MAN!!'
              }

              return request
                .post('/api/articles/1/comments')
                .send(postReq)
                .expect(400)
                .then(({ body }) => {
                  expect(body.msg).to.equal('bad request')
                })
            })
            it('POST status:400 - responds bad request if the body has no key value pairs entered incorrectly', () => {

              const postReq = {
                userna: 'icellusedkars',
                body: 'THE BEST ARTICLE EVER MAN!!'
              }


              return request
                .post('/api/articles/10000/comments')
                .send(postReq)
                .expect(404)
                .then(({ body }) => {
                  expect(body.msg).to.equal('id not found')
                })
            })
            describe('/comments/:comment_id', () => {
              it('PATCH status:200 - allows for incrementation on the votes column for a spectific comment_id', () => {

                const votes = {
                  inc_votes: 2
                }
                return request
                  .patch('/api/comments/2')
                  .send(votes)
                  .expect(200)
                  .then(({ body }) => {
                    expect(body.comment.votes).to.equal(16)
                  })
              })
              it('PATCH status:400 - responds with bad request if the key of the body has been entered incorrectly', () => {

                const votes = {
                  inc_vot: 2
                }
                return request
                  .patch('/api/comments/2')
                  .send(votes)
                  .expect(400)
                  .then(({ body }) => {
                    expect(body.msg).to.eql('bad request')
                  })
              })
              it('GET status:400 - responds with a single comment', () => {
                return request
                  .get('/api/comments/2')
                  .expect(200)
                  .then(({ body }) => {
                    expect(body.comment[0].comment_id).to.eql(2)
                  })
              })
              it('PATCH status:400 - responds with bad request if the key of the body has been entered incorrectly', () => {

                const votes = {
                  inc_vot: 'g'
                }
                return request
                  .patch('/api/comments/2')
                  .send(votes)
                  .expect(400)
                  .then(({ body }) => {
                    expect(body.msg).to.eql('bad request')
                  })
              })
              it('PATCH status:404 - responds with invalid id when a valid format of id is passed but does not exist ', () => {

                const votes = {
                  inc_votes: 50
                }

                return request
                  .patch('/api/comments/10000')
                  .send(votes)
                  .expect(404)
                  .then(({ body }) => {
                    expect(body.msg).to.eql('id not found')
                  })
              })
              it('DELETE status:204 - responds with the status 204 and no content', () => {
                return request
                  .delete('/api/comments/1')
                  .expect(204)

              })
              it('DELETE status:400 - responds bad request with status 400', () => {
                return request
                  .delete('/api/comments/m')
                  .then(({ body }) => {
                    expect(body.msg).to.equal('bad request')
                  })
              })
              it('DELETE status:400 - responds bad request with status 400 if an invalid id has been passed', () => {
                return request
                  .delete('/api/comments/10000')
                  .then(({ body }) => {
                    expect(body.msg).to.equal('id does not exist')
                  })
              })
              describe('/:username', () => {
                it('GET status:200- responds with the user with the given username', () => {
                  return request
                    .get('/api/users/icellusedkars')
                    .expect(200)
                    .then(({ body }) => {
                      expect(body.user.username).to.eql('icellusedkars')
                    })
                })
                it.only('GET status:200- responds with articles written by a specific author', () => {
                  return request
                    .get('/api/users/icellusedkars/articles')
                    .expect(200)
                    .then(({ body }) => {
                      expect(body.articles[0].author).to.eql('icellusedkars')
                    })


                })
                it('GET status:404- responds with invalid username if the incorrect user has been passed', () => {
                  return request
                    .get('/api/users/icellu')
                    .expect(404)
                    .then(({ body }) => {
                      expect(body.msg).to.equal('invalid username')
                    })
                })
              })
            })
          })
        })
      })
    })
  })
})