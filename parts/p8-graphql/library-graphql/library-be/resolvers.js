const { v4: uuidv4 } = require('uuid')
const { config } = require('./utils/config')
const { Book, Author, User } = require('./models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

const assertLoggedIn = (context) => {
    const currentUser = context.currentUser
    if (!currentUser) {
        console.log({ message: 'User not logged in', currentUser });
        throw new GraphQLError('not authenticated', {
            extensions: {
                code: 'BAD_USER_INPUT',
            }
        })
    }
}

const resolvers = {
    Author: {
        bookCount: async (root) => {
            const books = await Book.find({})
            const byAuthor = (b) => String(b.author) === root.id
            return books.filter(byAuthor).length
        }
    },
    Query: {
        bookCount: async (root, args, context) => {
            const books = await Book.find({})
            console.log({ books })
            return books.length
        },
        authorCount: async () => {
            const authors = await Author.find({})
            console.log({ authors });
            return authors.length
        },
        allBooks: async (root, args, context) => {
            console.log({ args, context });
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
            assertLoggedIn(context)
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
            assertLoggedIn(context)
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
                            expiresIn: '10h'
                        }
                    )
                }
            }
            console.log({ message: 'Wrong password', args, user });
            return null
        }
    },
}

module.exports = resolvers