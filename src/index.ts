import express from "express";
import { graphqlHTTP } from "express-graphql";
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} from "graphql";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        books: {
            type: ProgramType,
            description: "List of programs",
            resolve: () =>
        }
    }),
})

app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema
}));

app.listen(
    PORT,
    () => console.log(`App listening on port ${PORT}`)
);
