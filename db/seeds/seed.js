const { topicsData, articleData, commentsData, usersData } = require('../data');
const { formatArticleData, formatCommentData } = require('../utils/function')


exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('topics')
        .insert(topicsData)
        .returning('*')
    }).then(() => {

      return knex('users')
        .insert(usersData)
        .returning('*')
    }).then(() => {
      return knex('articles')
        .insert(formatArticleData(articleData, topicsData, usersData))
        .returning('*')
    }).then((articles) => {
      console.log(articles)
      return knex('comments')
        .insert(formatCommentData(commentsData, articles, usersData))
        .returning('*')
    })
};


/*
const userPromise = knex('users')
        .insert(userData)
        .returning('*')

  // Promise { pending }
  // userPromise.then(data => console.log(data)

const topicPromise  = knex('topics')
        .insert(topicsData)
        .returning('*')

  // Promise { pending }

  // topicPromise.then(topics => console.log(topics))

        Promise.all([userPromise, topicPromise])
        . then ([array of datas])


*/