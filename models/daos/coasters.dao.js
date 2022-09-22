const MongoDBContainer = require('../../containers/Mongodb.container');
const CoasterSchema = require('../schemas/coaster.schema')
const collection = 'roller-coasters';

class CoastersDao extends MongoDBContainer {
    static instance;
    constructor() {
        if (!CoastersDao.instance) {
            super(collection, CoasterSchema);
            CoastersDao.instance = this;
            return this;
        } else {
            return CoastersDao.instance;
        }
    }
    async getCoasters(){
      
      try {
        const coasters = await this.getAll();
        if(!coasters){
          throw new Error(`Cant find coasters`)
        }else{
          return coasters
        }
      } catch (error) {
        console.log(error);
      }
    }
    async getCoasterById(id){
      try {
          const coaster = await this.getById(id)
          if (!coaster) {
              const errorMessage = `Coaster with id  "${id}" does not exists`;
              throw new Error(JSON.stringify(errorMessage));
          } else {
              return coaster;
          }
      } catch (error) {
          console.log('error',error.message)
      }
    }
};

module.exports = CoastersDao;