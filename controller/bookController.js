import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'





export const getBooks = asyncHandler(async(req, res) => {
    
    const books = await Book.find({})

    res.json(books)
})


export const createBook = asyncHandler(async(req, res) => {

    const {title, descr, author} = req.body
    if (!title || !descr || !author) {
        res.status(400).json({ error: "Please provide all required fields" })
        return
    }
    const task = await Book.create({
        title: title,
        descr: descr,
        author: author
    })

    res.status(201).json(task)
});



export const getBookDetail = asyncHandler(async(req, res) => {
    
    const book = await Book.findById(req.params.id)

    if(!book) {
        throw new Error('Book not found')

    }else {
        res.status(200).json(book)

    }

})


export const updateBook = asyncHandler(async (req, res) => {
    try {
        const {title, descr, author} = req.body;

        const book = await Book.findById(req.params.id);

        if (book) {
            if (title) book.title = title;
            if (descr) book.descr = descr;
            if (author) book.author = author;

            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404);
            throw new Error("Book Not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});




export const deleteBook = asyncHandler(async (req, res) => {
    try {

        const book = await Book.findById(req.params.id);

        if (book) {
           

             await book.deleteOne({_id: book._id})
             res.json({message: 'Product removed'})

            
        } else {
            res.status(404);
            throw new Error("Book Not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

