const mongoose = require('mongoose');
const Book = require('./book');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

authorSchema.pre('remove', function(next) {
    Book.find({ author: this.id }, (err, books) => {
        if (err) {
            next(err); // pass err to next function
        } else if (books.length > 0) {
            next(new Error('This author has books still.'));
        } else {
            next(); // Author has no books in library
        }
    })
});

module.exports = mongoose.model('Author', authorSchema);