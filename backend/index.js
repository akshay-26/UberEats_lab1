const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typedef/typeDefs');
const resolvers = require('./resolvers');
const { mongoDB } = require('./Config');

const PORT = process.env.port || 3001;

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 100
};

mongoose.connect(mongoDB, options)
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch(err => {
        console.error(err)
    })