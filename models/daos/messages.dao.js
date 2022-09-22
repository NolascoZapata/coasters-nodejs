const MongoDBContainer = require('../../containers/Mongodb.container');
const MessageSchema = require('../schemas/message.schema')
const collection = 'messages';

class MessagesDao extends MongoDBContainer {
  static instance;
  constructor() {
      if (!MessagesDao.instance) {
          super(collection, MessageSchema);
          MessagesDao.instance = this;
          return this;
      } else {
          return MessagesDao.instance;
      }
  }
  async getMessages (){
    try {
      const messages = await this.getAll();
      if(!messages){
        throw new Error(`Cant find messages`)
      }else{
        return messages
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createMessage(messageItem){
    try {
      const message = await this.createItem(messageItem);
      await message.save()
      return message;
  } catch (error) {
      console.log('error',error.message)
      console.log('error',`Error creating message`)
  }
  }

  async getMessageById(id){
    try {
        const message = await this.getById(id)
        if (!message) {
            const errorMessage = `Message with id  "${id}" does not exists`;
            throw new Error(JSON.stringify(errorMessage));
        } else {
            return message;
        }
    } catch (error) {
        console.log('error',error.message)
    }
  }

  async deleteMessageById(id){
    try {
      const message = await this.deleteById(id);
      if(!message){
        throw new Error(`Cant delete message with id ${id}`)
      }else{
        return message
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  async deleteMessages(){
    try {
      const messages = await this.deleteAll();
      if(!messages){
        throw new Error(`Cant find messages`)
      }else{
        return messages
      }
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = MessagesDao;