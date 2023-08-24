import mongoose from 'mongoose'


const  BookSchema = mongoose.Schema({
    
    title :{
        type: 'string',
        required: true,
    },

    descr :{
        type: 'string',
        required: true,
    },

    author :{
        type: 'string',
        required: true,
    }, 

}, {
    timestamps: true

})

const Book = mongoose.model('book', BookSchema)


export default Book