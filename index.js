const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const compression = require('compression')

const apiRoutes = require('./routes/index.routers')

const PORT = process.env.PORT | 8080

// app.use(cors())
app.use(compression())
require('dotenv').config();

(async () => {

    await mongoose
        .connect(`mongodb+srv://NolascoZapata:${process.env.DB_PASSWORD}@backend-coderhouse.0dkdf.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`)
        .then(() => console.log(`Connected to ${process.env.DATABASE}`))
})()

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//CORS

const whitelist = ['https://roller-tickets.netlify.app/']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error())
        }
    }
}


//Routes
app.use('/api',cors(corsOptions), apiRoutes)


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))