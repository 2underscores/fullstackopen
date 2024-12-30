const { config } = require('./utils/config')

const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const DataLoader = require('dataloader')
const mongoose = require('mongoose')
const { User, Book } = require('./models/models')
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
mongoose.set('debug', true);

// CONTEXTS FOR GRAPHQL QUERIES
const getUserFromAuth = async ({ req, res }) => {
    let currentUser = null
    const authHeader = req.headers?.authorization ?? null
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return currentUser
    }
    const encodedToken = authHeader.substring(7)
    try {
        const decodedToken = jwt.verify(encodedToken, config.auth.jwtSecret)
        if (!decodedToken) {
            return currentUser
        }
        currentUser = await User.findById(decodedToken.id)
        return currentUser
    } catch (e) {
        console.log(`ERROR: ${e.name} - ${e.message}`)
        if (e.name === 'TokenExpiredError') {
            return null
        } else {
            // Errors here from a client using a bad token crash the entire server for everyone
            throw e
        }
    }
}

// Avoid N+1 Problem on author book counts with request scoped cache
const batchBookCounts = async (authorIds) => {
    const books = await Book.find({ author: { $in: authorIds } })
    const countMap = books.reduce((acc, book) => {
      const authorId = String(book.author)
      acc.set(authorId, (acc.get(authorId) || 0) + 1)
      return acc
    }, new Map())
    return authorIds.map(id => countMap.get(String(id)) || 0)
  }

const serverStart = async () => {
    // Parent HTTP Server
    const app = express()
    const httpServer = http.createServer(app)
    // Websocket Server
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/',
    })
    // Apollo GraphQL Server
    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const serverCleanup = useServer({ schema }, wsServer)
    const apolloServer = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }), // ?
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ]
    })
    await apolloServer.start()

    app.use(
        '/',
        cors(),
        express.json(),
        expressMiddleware(apolloServer, {
            context: async ({ req, res }) => {
                const currentUser = getUserFromAuth({ req, res })
                const bookCountLoader = new DataLoader(batchBookCounts)
                return { currentUser, bookCountLoader }
            },
        })
    )
    const PORT = config.server.port
    httpServer.listen(PORT, () => {
        console.log(`Server is now running on http://localhost:${PORT}`);

    })
}

serverStart()
