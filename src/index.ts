import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

const server = new ApolloServer({});

server.applyMiddleware({ app });

app.listen(
    PORT,
    () => console.log(`App listening on port ${PORT}`)
);
