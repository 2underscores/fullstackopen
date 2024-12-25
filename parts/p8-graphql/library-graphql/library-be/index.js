const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuidv4 } = require('uuid')
const { config } = require('./utils/config')
const mongoose = require('mongoose')
const { Book, Author } = require('./models/models')

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

type Query {
    bookCount: Int!

    authorCount: Int!

    allBooks(
        author: String
        genre: String
    ): [Book!]!
    
    allAuthors: [Author!]!
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
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            console.log({ args });
            // Create new author if not already exist
            let author = await Author.findOne({name: args.author})
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
        editAuthor: async (root, args) => {
            console.log({ args });
            const author = await Author.findOne({name: args.name})
            if (!author) return null
            author.born = args.setBornTo
            await author.save()
            return author
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
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})