const express = require('express');
const router = express.Router();
const {getCoastersController,getCoasterByIdController} = require('./../controllers/coaster.controller');


//middlewares
router.use(express.json())
router.use(express.urlencoded({extended: true}))

//Routes
router.get('/',getCoastersController)
router.get('/:id',getCoasterByIdController)


module.exports = router