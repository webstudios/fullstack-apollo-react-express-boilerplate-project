import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import jwt from 'jsonwebtoken';
import DataLoader from 'dataloader';
import express from 'express';
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models from './models';
import loaders from './loaders';

const port = process.env.PORT || 8000;

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true },
);

const app = express();

app.use(cors());

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const createUsersWithMessages = async date => {
  // destroy it all
  await models.User.deleteMany({});
  await models.Message.deleteMany({});

  // to rise again
  let user1 = new models.User({
    username: 'rwieruch',
    email: 'hello@robin.com',
    password: 'rwieruch',
    role: 'ADMIN',
  });

  let user2 = new models.User({
    username: 'ddavids',
    email: 'hello@david.com',
    password: 'ddavids',
  });

  let message1 = new models.Message({
    text: 'Published the Road to learn React',
    createdAt: date.setSeconds(date.getSeconds() + 1),
    user: user1.id,
  });

  let message2 = new models.Message({
    text: 'Happy to release a GraphQL in React tutorial',
    createdAt: date.setSeconds(date.getSeconds() + 1),
    user: user2.id,
  });

  let message3 = new models.Message({
    text: 'A complete React with Apollo and GraphQL Tutorial',
    createdAt: date.setSeconds(date.getSeconds() + 1),
    user: user2.id,
  });

  message1.save();
  message2.save();
  message3.save();

  user1.messages.push(message1.id);
  user2.messages.push(message2.id);
  user2.messages.push(message3.id);

  user1.save();
  user2.save();
};

createUsersWithMessages(new Date());

httpServer.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
});
