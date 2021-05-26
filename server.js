//Import npm packages
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path= require('path')

//Middleware
const app = express()
const PORT = process.env.PORT || 8000

const routes = require('./routes/api')


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})



mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!')
})

//Middleare to parse json data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Deployment- constum variable for heruku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

//HTTP request logger
app.use(morgan('tiny'))
app.use('/api', routes)


app.listen(PORT, console.log(`Server is starting at ${PORT}`))