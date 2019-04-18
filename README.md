# nc-news

## Available Scripts

Create development and test databases locally:

```bash
npm run setup-dbs
```

Create a new migration file:

```bash
npm run migrate-make <filename>
```

Run all migrations:

```bash
npm run migrate-latest
```

Rollback all migrations:

```bash
npm run migrate-rollback
```

Run tests:

```bash
npm test
```

Rollback, migrate -> latest, then start inserting data into the database:

```bash
npm run seed
```

Run the server with `nodemon`, for hot reload:

```bash
npm run dev
```

Run the server with `node`:

```bash
npm start
```



exports.up = function (knex, Promise) {
    return knex.schema.createTable('articles', articlesTable => {
        articlesTable.increments('article_id').primary();
        articlesTable.string('title').notNullable();
        articlesTable.string('tpoic').notNullable();
        articlesTable.string('author').notNullable();
        articlesTable.string('body').notNullable();
        articlesTable.integer('created_at')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('articles')
};
