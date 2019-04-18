
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', usersTable => {
        usersTable.string('username').primary()
        usersTable.string('avatar-url').notNullable()
        usersTable.string('name').notNullable()
    })

};

exports.down = function (knex, Promise) {
    return knex.shema.dropTable('users')
};
