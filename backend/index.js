require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

// app routes
const userRoutes = require('./src/routes/userRoutes')
const categoryRoutes = require('./src/routes/categoryRoutes')
const productRoutes = require('./src/routes/productRoutes')
const app = express()

// middleware
app.use(express.json())

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useUnifiedTopology: true
}).then((res) => {
    app.listen(process.env.PORT)
    console.log('App is listening on port: ' + process.env.PORT)
}).catch((err) => console.log(err))

// use routes
app.use('/api/user', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)

app.use((req, res, next) => {
    res.status(404)
        .json('Endpoint not found!')
    console.log(req.path, req.method)
    next()
})
