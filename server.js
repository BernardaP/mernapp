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


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern_youtube', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})



//Saving data to mongo database
// const data = {
//   title: 'Welcome',
//   body: 'This is a test for a post content'
// }

// const newBlogPost = new BlogPost(data) //instance of the model

//.save()
// newBlogPost.save((error) => {
//   if (error) {
//     console.log("Something went")
//   } else {
//     console.log("Data has been saved")
//   }
// })


mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!')
})

//Middleare to parse json data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//HTTP request logger
app.use(morgan('tiny'))
app.use('/api', routes)


app.listen(PORT, console.log(`Server is starting at ${PORT}`))