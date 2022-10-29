const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const compression = require('compression')
const path = require('path')

const apiRoutes = require('./routes/index.routers')

const PORT = process.env.PORT | 8080

app.use(cors())
require('dotenv').config();

(async () => {

    await mongoose
        .connect(`mongodb+srv://NolascoZapata:${process.env.DB_PASSWORD}@backend-coderhouse.0dkdf.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`)
        .then(() => console.log(`Connected to ${process.env.DATABASE}`))
        .then(app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)))
})()

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, '/public')))

//----------------Template engine----------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Routes
app.use(compression())
app.use('/api', apiRoutes)

app.get('/',(req,res)=>{
    res.render('pages/login')
})
app.get('/home',(req,res)=>{
    res.render('pages/home')
})

app.get('/orders',(req,res)=>{
    res.render('pages/orders')
})
app.get('/messages',(req,res)=>{
    res.render('pages/messages')
})


