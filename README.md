# Northcoders New API 

This project is a RESTful Application Programming Interface (API) that utilises http methodologies in order to retrieve, edit, add or delete articles, topics, comments and users from a generated news based database.

## Getting Started

Follow these instructions in order to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

In order to install and run this software locally, you will require node.js.

## Installing

1. First of all fork this project to your own repo.
2. Clone the repo remotely by executing this command:

```
git clone <Insert Github Repo Link>
```

1. Change directory to the local repo file.
2. The following dependencies are required for deployment/production:

```

express: ^4.16.4
knex: ^0.15.2
pg: ^7.8.0
```

1. These dependencies are required for testing purposes:

```
supertest: ^3.4.2
nodemon: ^1.18.10
mocha: ^5.2.0
chai: ^4.2.0
```

1. Running the following command will install the dependencies:

```
npm install
```

## Setting up The Database

1. Create a config file in the project root directory, name it as such:

```
knexfile.js
```

1. In order to seed and migrate the database depending on the environment, see below (if using linux you will need to include psql user credentials);

```
const ENV = process.env.NODE_ENV || 'development'; 

const baseConfig = {
  client: "pg",
  seeds: {
    directory: "./db/seeds"
  },
  migrations: {
    directory: "./db/migrations"
  }
};

const dbConfig = {
  development: {
    connection: {
      database: 'nc_news',
    },
  },
  test: {
    connection: {
      database: 'nc_news_test',
    },
  },
};

module.exports = { ...baseConfig, ...dbConfig[ENV] };
```

** You may want to gitignore this file if sensitive data is used **

1. To setup and seed the database, run:

```
npm run setup-dbs
npm run migrate:rollback
npm run migrate:latest
npm run seed
```

## Testing

There are 2 spec files for testing this project, index.spec.js and app.spec.js.

Executing the following command will run the entire test suite:

```
npm run test
```

### API/Endpoint Testing

The app.spec.js file tests the API endpoints to make sure they all work as desired and also tests for error handling, for example:

```
   it('GET status:200 - bring back all the topics', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).to.be.an('array')
        })
    });
```

### Seeding/Utils Testing

The index.spec.js file tests that the seeding functions work as desired


## Routes

- For API routes/endpoints please reference the api-conteoller.js file located in controllers folder.


## Built With

- [Node.js](https://nodejs.org/en/docs/) - Used As The JavaScript Runtime Engine
- [Knex](https://knexjs.org/) - Used As The SQL Query Builder
- [Express](https://expressjs.com/en/api.html) - Used For The Web Application Framework
- [PostgreSQL](https://node-postgres.com/) - The Database
- [Heroku](https://devcenter.heroku.com/categories/nodejs-support) - Used For Live Application Deployment/Hosting

## Author

- **Hassan Bharu** - *Author*
- **Northcoders**


```



