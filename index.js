const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const apiRoutes = require('./routes/index.routers')

const PORT = process.env.PORT | 8080 

app.use(cors())
require('dotenv').config();

(async()=>{
    await mongoose
        .connect(`mongodb+srv://NolascoZapata:${process.env.DB_PASSWORD}@backend-coderhouse.0dkdf.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`)
        .then(()=>console.log(`Conectado a ${process.env.DATABASE}`))}
)()

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

//Routes
app.use('/api',apiRoutes)


app.listen(PORT,()=>console.log(`Server escuchando ${PORT}`))