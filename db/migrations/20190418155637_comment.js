
exports.up = function (knex, Promise) {
    return knex.schema.createTable('comments', commentTable => {
        commentTable.increments('comment_id').primary();
        commentTable.string('author')
        commentTable.foreign('author').references('users.username')

        commentTable.integer('article_id')
        commentTable.foreign('article_id').references('articles.article_id')
        commentTable.integer('votes').defaultTo(0)
        commentTable.datetime('created_at')
        commentTable.string('body').notNullable()
    })
};

exports.down = function (knex, Promise) {
    return knex.schea('comments')
};
