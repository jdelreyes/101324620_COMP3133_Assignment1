import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { context } from './context';
import { schema } from './schema';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const SERVER_PORT: number = 8000;

dotenv.config();

// app config
const app: Express = express();
const apolloServer: ApolloServer<ExpressContext> = new ApolloServer({
  context,
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

// db
const uri: string = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_NAME}:27017/`;

mongoose
  .connect(uri)
  .then(async (): Promise<void> => {
    console.log('[LOG] Connected to MongoDB');
  })
  .catch((err): void => {
    console.error('[ERROR] Failed to connect to MongoDB', err);
    process.exit();
  });

app.listen(SERVER_PORT, (): void => {
  console.log(`[LOG] Server is running at port ${SERVER_PORT}`);
});

const startServer = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  console.log(`[LOG] Apollo server is running`);
};

startServer();
