const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

require('dotenv').config()

const app = express()
const port = process.env.PORT

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use('/api/user', userRoutes)

//Connection to MongoDB
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database has connected succesfully!")
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
