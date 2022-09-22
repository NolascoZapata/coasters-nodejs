const express = require('express');
const router = express.Router();
const getCoastersController = require('./../controllers/coaster.controller');


//middlewares
router.use(express.json())
router.use(express.urlencoded({extended: true}))

//Routes
router.get('/',getCoastersController)


module.exports = router