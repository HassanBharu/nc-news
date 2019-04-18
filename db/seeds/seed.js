const { topicsData, articleData, commentsData, usersData } = require('../data');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('topics')
        .insert(topicsData)
        .returning('*')
    }).then((topicData) => {

      return knex('users')
        .insert(usersData)
        .returning('*')
    }).then((data) => {

      console.log(data)
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