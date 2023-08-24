import express from'express'
import {getBooks, createBook, getBookDetail, updateBook, deleteBook} from '../controller/bookController.js'


const router = express.Router()



router.route('/').get(getBooks).post(createBook)
router.route('/:id').get(getBookDetail).put(updateBook).delete(deleteBook)


export default router