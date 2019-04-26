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
    }).then((articleRows) => {
      return knex('comments')
        .insert(formatCommentData(commentsData, articleRows, usersData))
    })
};

