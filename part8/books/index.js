// Apollo Server and GraphQL
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { execute, subscribe } = require('graphql');

// express server
const express = require('express');
const http = require('http');

// subscription websocket
const { SubscriptionServer } = require('subscriptions-transport-ws');

// env variables
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;

// mongoDB
const mongoose = require('mongoose');

// User authentication
const User = require('./models/user');
const jwt = require('jsonwebtoken');

// graphql schema
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

console.log('connecting to', MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connected to mongodb'))
  .catch((error) => console.log('unable to connect to mongodb', error));

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: '',
    }
  );

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: '/',
  });

  const PORT = 4000;

  httpServer.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`));
};

start();
