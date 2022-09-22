const MessagesDao = require("../models/daos/messages.dao")
const messages = new MessagesDao();

const getMessagesController = async (req, res, next) => {
  try {
    const mgs = await messages.getMessages()
    console.log('[GET]==> Get messages')
    res.status(200).json(mgs)
  } catch (error) {
    console.log( error.message)
    next(error)
  }
}

const getMessageByIdController = async (req, res, next) => {
  try {
    const id = req.params.id
    const mg = await messages.getMessageById(id);
    console.log('[GET]==> Get Messages By Id');
    res.status(200).json(mg)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

const saveMessageController = async (req,res,next)=>{
  try {
      const newMessage = await messages.createMessage(req.body)
      console.log('[POST]==> Message saved')
      res.status(200).json(newMessage._id)
  } catch (error) {
      console.log(error.message)
      next(error)
  }
}

const deleteMessageByIdController = async (req,res,next)=>{
  try {
    const id = req.params.id
    const deleteMessage = await messages.deleteMessageById(id)
    console.log(`[DELETE]==> Message with id ${id} deleted`)
    res.status(200).json(deleteMessage)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

const deleteMessagesController = async (req, res, next) => {
  try {
    const mgs = await messages.deleteMessages()
    console.log('[DELETE]==> All messages deleted')
    res.status(200).json(mgs)
  } catch (error) {
    console.log( error.message)
    next(error)
  }
}


module.exports = {
  getMessagesController,
  getMessageByIdController,
  saveMessageController,
  deleteMessageByIdController,
  deleteMessagesController
}