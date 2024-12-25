const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },
    published: {
        type: Number,
        required: true,
        max: [2030, 'Book cannot be published in the future']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
    },
    genres: {
        type: [String],
        required: true
    },
});

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },
    born: {
        type: Number,
        required: false,
        max: [2030, 'Author cannot be born in the future']
    },
});

const Book = mongoose.model('Book', bookSchema);
const Author = mongoose.model('Author', authorSchema);
module.exports = { Book, Author };