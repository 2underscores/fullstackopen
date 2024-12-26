const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuidv4 } = require('uuid')
const { config } = require('./utils/config')
const mongoose = require('mongoose')
const { Book, Author, User } = require('./models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

// let authors = [
//     {
//         name: 'Robert Martin',
//         id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//         born: 1952,
//     },
//     {
//         name: 'Martin Fowler',
//         id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//         born: 1963
//     },
//     {
//         name: 'Fyodor Dostoevsky',
//         id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//         born: 1821
//     },
//     {
//         name: 'Joshua Kerievsky', // birthyear not known
//         id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//     },
//     {
//         name: 'Sandi Metz', // birthyear not known
//         id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//     },
// ]


// let books = [
//     {
//         title: 'Clean Code',
//         published: 2008,
//         author: 'Robert Martin',
//         id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//         genres: ['refactoring']
//     },
//     {
//         title: 'Agile software development',
//         published: 2002,
//         author: 'Robert Martin',
//         id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//         genres: ['agile', 'patterns', 'design']
//     },
//     {
//         title: 'Refactoring, edition 2',
//         published: 2018,
//         author: 'Martin Fowler',
//         id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//         genres: ['refactoring']
//     },
//     {
//         title: 'Refactoring to patterns',
//         published: 2008,
//         author: 'Joshua Kerievsky',
//         id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//         genres: ['refactoring', 'patterns']
//     },
//     {
//         title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//         published: 2012,
//         author: 'Sandi Metz',
//         id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//         genres: ['refactoring', 'design']
//     },
//     {
//         title: 'Crime and punishment',
//         published: 1866,
//         author: 'Fyodor Dostoevsky',
//         id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//         genres: ['classic', 'crime']
//     },
//     {
//         title: 'Demons',
//         published: 1872,
//         author: 'Fyodor Dostoevsky',
//         id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//         genres: ['classic', 'revolution']
//     },
// ]

const typeDefs = `
type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
}

type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
}

type User {
    username: String!
    favoriteGenre: String
    id: ID!
}

type Token {
    value: String!
}

type Query {
    bookCount: Int!

    authorCount: Int!

    allBooks(
        author: String
        genre: String
    ): [Book!]!
    
    allAuthors: [Author!]!

    allUsers: [User!]!

    me: User
}

type Mutation {
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    ): Book!
    
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author

    createUser(
        username: String!
        password: String!
        favoriteGenre: String
    ): User

    login(
        username: String!
        password: String!
    ): Token
}
`

// // TEST
// const booksMongo = Book.find({})
// console.log({ booksMongo })
// console.log('HJi');


const resolvers = {
    Author: {
        bookCount: async (root) => {
            const books = await Book.find({})
            const byAuthor = (b) => String(b.author) === root.id
            return books.filter(byAuthor).length
        }
    },
    Query: {
        bookCount: async () => {
            const books = await Book.find({})
            console.log({ books })
            return books.length
        },
        authorCount: async () => {
            const authors = await Author.find({})
            console.log({ authors });
            return authors.length
        },
        allBooks: async (root, args) => {
            console.log({ args });
            const books = await Book.find({}).populate('author')
            console.log({ books });
            const byAuthor = (b) => args.author ? b.author.name === args.author : true
            const byGenre = (b) => args.genre ? b.genres.includes(args.genre) : true
            return books.filter(byAuthor).filter(byGenre)
        },
        allAuthors: async () => {
            const authors = await Author.find({})
            console.log({ authors });
            return authors
        },
        allUsers: async () => {
            const users = await User.find({})
            console.log({ users })
            return users
        },
        me: async (root, args, context) => {
            console.log({ context });
            return context.currentUser
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            console.log({ args });
            // Check if user is logged in
            const currentUser = context.currentUser
            if (!currentUser) {
                console.log({ message: 'User not logged in', args, currentUser });
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            // Create new author if not already exist
            let author = await Author.findOne({ name: args.author })
            console.log({ existingAuthor: author });
            if (!author) {
                author = new Author({ name: args.author, id: uuidv4() })
                console.log({ newAuthor: author });
                await author.save()
            }
            console.log({ author });
            // Create new book
            const newBook = new Book({ ...args, id: uuidv4(), author: author.id })
            await newBook.save()
            await newBook.populate('author')
            return newBook
        },
        editAuthor: async (root, args, context) => {
            console.log({ args });
            // Check if user is logged in
            const currentUser = context.currentUser
            if (!currentUser) {
                console.log({ message: 'User not logged in', args, currentUser });
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            const author = await Author.findOne({ name: args.name })
            if (!author) return null
            author.born = args.setBornTo
            await author.save()
            return author
        },
        createUser: async (root, args) => {
            console.log({ args, config });
            const passwordHash = await bcrypt.hash(args.password, Number(config.auth.saltRounds))
            const user = new User({
                id: uuidv4(),
                username: args.username,
                passwordHash,
                favoriteGenre: args.favoriteGenre
            })
            await user.save()
            return user
        },
        login: async (root, args) => {
            const users = await User.find({ username: args.username })
            console.log({ args, users });
            // Get User
            // No signalling as all errors return null
            if (users.length === 0) {
                console.log({ message: 'User not found', args, users });
                return null
            } else if (users.length > 1) {
                console.log({ message: 'Multiple users found', args, users });
                return null
            }
            const user = users[0]
            const passwordCompare = await bcrypt.compare(args.password, user.passwordHash)
            console.log({ passwordCompare });
            // Create token
            if (passwordCompare) {
                console.log({ message: 'User logged in', user });
                const tokenContents = {
                    username: user.username,
                    id: user.id
                }
                return {
                    value: jwt.sign(
                        tokenContents,
                        config.auth.jwtSecret,
                        {
                            expiresIn: '1h'
                        }
                    )
                }
            }
            console.log({ message: 'Wrong password', args, user });
            return null
        }
    },
}

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