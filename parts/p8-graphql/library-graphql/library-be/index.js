const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { config } = require('./utils/config')
const mongoose = require('mongoose')
const { User } = require('./models/models')
const jwt = require('jsonwebtoken')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const mongoUrl = `mongodb+srv://${config.mongo.user}:${config.mongo.password}@${config.mongo.cluster}.ljiec.mongodb.net/${config.mongo.table}?retryWrites=true&w=majority&appName=${config.mongo.cluster}`
mongoose.connect(mongoUrl)
    .then(() => {
        console.log(`Connected to MongoDB at ${mongoUrl}`)
    })
    .catch((error) => {
        console.error(`Failed to connect to MongoDB: ${error.message}`)
    })

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: config.server.port },
    context: async ({ req, res }) => {
        let currentUser = null
        const authHeader = req.headers?.authorization ?? null
        // console.log({ authHeader });
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return { currentUser }
        }
        const decodedToken = jwt.verify(authHeader.substring(7), config.auth.jwtSecret)
        // FIXME: Errors if expired, crashes whole API, nothing works and can't login
        // console.log({ decodedToken });
        if (!decodedToken) {
            return { currentUser }
        }
        currentUser = await User.findById(decodedToken.id)
        // console.log({ currentUser })
        return { currentUser }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})