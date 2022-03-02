import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { buildSchema } from 'type-graphql';

import { ProductResolver } from './resolvers';
import { products } from './data';

const port = 3000;

async function start(resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = await buildSchema({ resolvers });
  const apolloServer = new ApolloServer({
    schema,
    context: { db: { products } },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  );
}

start([ProductResolver]);
