require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const usersRouter = require('./routes/users')
const articlesRouter = require('./routes/articles')
const commentsRouter = require('./routes/comments')
const app = express()
const port = 3000

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err))

// Middleware
app.use(express.json())

// Routes
app.use('/api/users', usersRouter)
app.use('/api/articles', articlesRouter)
app.use('/api/comments', commentsRouter)

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Elite Conseil API' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
