# fullstack-apollo-react-express-boilerplate-project

[![Slack](https://slack-the-road-to-learn-react.wieruch.com/badge.svg)](https://slack-the-road-to-learn-react.wieruch.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project.svg)](https://greenkeeper.io/)

A full-fledged Apollo Server 2 with Apollo Client 2 starter project with React, Express and PostgreSQL.

[GraphQL Server Tutorial](https://www.robinwieruch.de/graphql-apollo-server-tutorial/)

## Features

* React (create-react-app) with Apollo Client 2
  * Queries, Mutations, Subscriptions
* Node.js with Express and Apollo Server 2
  * cursor-based Pagination
* PostgreSQL Database with Sequelize
  * entities: users, messages
* Authentication
  * powered by JWT and local storage
  * Sign Up, Sign In, Sign Out
* Authorization
  * protected endpoint (e.g. verify valid session)
  * protected resolvers (e.g. e.g. session-based, role-based)
  * protected routes (e.g. session-based, role-based)
* performance optimizations
  * example of using Facebook's dataloader
* E2E testing

## Installation

* `git clone git@github.com:the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project.git`
* `cd fullstack-apollo-react-express-boilerplate-project`

### Client

* `cd client`
* `npm install`
* `npm start`
* visit `http://localhost:3000`

### Server

* `cd server`
* `touch .env`
* `npm install`
* fill out *.env file* (see below)
* `npm start`
* optional visit `http://localhost:8000` for GraphQL playground

#### .env file

Since this boilerplate project is using PostgreSQL, you have to install it for your machine and get a database up and running. You find everything for the set up over here: [Setup PostgreSQL with Sequelize in Express Tutorial](https://www.robinwieruch.de/postgres-express-setup-tutorial). After you have created a database and a database user, you can fill out the environment variables in the *server/.env* file.

```
DATABASE=mydatabase
TEST_DATABASE=mytestdatabase

DATABASE_USER=postgres
DATABASE_PASSWORD=postgres

SECRET=asdlplplfwfwefwekwself.2342.dawasdq
```

The `SECRET` is just a random string for your authentication. Keep all these information secure by adding the *.env* file to your *.gitignore* file. No third-party should have access to this information.

#### Testing

* adjust `test-server` npm script with `TEST_DATABASE` environment variable in package.json to match your testing database name
  * to match it from package.json: `createdb mytestdatabase` with psql
* one terminal: npm run test-server
* second terminal: npm run test

## Want to learn more about React + GraphQL + Apollo?

* Don't miss [upcoming Tutorials and Courses](https://www.getrevue.co/profile/rwieruch)
* Check out current [React Courses](https://roadtoreact.com)
