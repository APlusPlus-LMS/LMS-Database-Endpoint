"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
const schema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: "HelloWorld",
        fields: () => ({
            message: {
                type: graphql_1.GraphQLString,
                resolve: () => "Hello World"
            }
        })
    })
});
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    graphiql: true,
    schema
}));
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
