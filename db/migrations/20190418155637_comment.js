
exports.up = function (knex, Promise) {
    return knex.schema.createTable('comments', commentTable => {
        commentTable.increments('comment_id').primary();
        commentTable.string('author').notNullable()
        commentTable.foreign('author').references('users.username')

        commentTable.integer('article_id')
        commentTable.foreign('article_id')
            .references('articles.article_id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')


        commentTable.integer('votes').defaultTo(0);
        commentTable.datetime('created_at').defaultTo(knex.fn.now());
        commentTable.text('body').notNullable()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('comments')
};
