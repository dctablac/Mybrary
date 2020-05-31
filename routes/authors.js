const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');

// All Authors Route
router.get('/', async (req,res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i') // 'i': case insensitive
    }
    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index', { 
            authors: authors, 
            searchOptions: req.query
        });
    } catch {
        res.redirect('/');
    }
});

// New Author Route
router.get('/new', (req,res) => {
    res.render('authors/new', { author: new Author() });
});

// Create Author Route
router.post('/', async (req,res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save();
        res.redirect(`authors/${newAuthor.id}`);
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
});

// Show specific author route
router.get('/:id', async (req,res) => {
    try {
        const author = await Author.findById(req.params.id);
        const books = await Book.find({ author: author.id }).limit(6).exec();
        res.render('authors/show', {
            author: author,
            booksByAuthor: books
        });
    } catch {
        res.redirect('/')
    }
})

// Intent to edit an author route
router.get('/:id/edit', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        res.render('authors/edit', { author: author });
    } catch(err) {
        console.log(err)
        res.redirect('/authors');
    }
    
})

// Method Override library allows us to use put and delete, since browser only supports GET and POST requests

// Update the author route
router.put('/:id', async (req, res) => {
    let author;
    try {
        author = await Author.findById(req.params.id);
        author.name = req.body.name;
        await author.save();
        res.redirect(`/authors/${author.id}`);
    } catch {
        if (author == null) {
            res.redirect('/');
        } else{
            res.render('authors/edit', {
                author: author,
                errorMessage: 'Error updating Author'
            });
        }
    }
})

// Delete an author route
// In the Author view, we can't use a simple GET request, as web crawlers activate GET requests, and potentially, 
//     linking that with this route, items will be GET requested for deletion. Therefore, anchor tags are not used 
//     for DELETE routes. Forms are needed.
router.delete('/:id', async (req, res) => {
    let author;
    try {
        author = await Author.findById(req.params.id);
        await author.remove();
        res.redirect('/authors');
    } catch {
        if (author == null) {
            res.redirect('/');
        } else {
            res.redirect(`/authors/${author.id}`);
        }
    }
})

module.exports = router;
