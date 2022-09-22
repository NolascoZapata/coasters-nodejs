const express = require('express');
const router = express.Router();
const {
  getMessagesController,
  getMessageByIdController,
  saveMessageController,
  deleteMessageByIdController,
  deleteMessagesController
} = require('../controllers/messages.controller')


//middlewares
router.use(express.json())
router.use(express.urlencoded({extended: true}))

//Routes
router.get('/',getMessagesController)
router.get('/:id',getMessageByIdController)
router.post('/',saveMessageController)
router.delete('/:id',deleteMessageByIdController)
router.delete('/',deleteMessagesController)


module.exports = router