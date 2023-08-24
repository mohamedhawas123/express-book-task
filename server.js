import express from 'express'
import connectDB from './config/db.js'
import cors from 'cors'
import bookRoutes from './routes/bookRoutes.js'
import userRoutes from './routes/userRoutes.js'

connectDB()

const app = express();

app.use(express.json())

app.use(cors())



app.use('/api/books', bookRoutes)
app.use('/api/users', userRoutes)


app.listen(5000, console.log('running'))



