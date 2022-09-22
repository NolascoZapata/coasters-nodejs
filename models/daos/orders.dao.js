const MongoDBContainer = require('../../containers/Mongodb.container');
const OrderSchema = require('../schemas/order.schema')
const collection = 'orders';

class OrdersDao extends MongoDBContainer {
  static instance;
  constructor() {
      if (!OrdersDao.instance) {
          super(collection, OrderSchema);
          OrdersDao.instance = this;
          return this;
      } else {
          return OrdersDao.instance;
      }
  }
  async getOrders (){
    try {
      const orders = await this.getAll();
      if(!orders){
        throw new Error(`Cant find orders`)
      }else{
        return orders
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createOrder(orderItem){
    try {
      const order = await this.createItem(orderItem);
      await order.save()
      return order;
  } catch (error) {
      console.log('error',error.message)
      console.log('error',`Error creating order`)
  }
  }

  async getOrderById(id){
    try {
        const order = await this.getById(id)
        if (!order) {
            const errorMessage = `Order with id  "${id}" does not exists`;
            throw new Error(JSON.stringify(errorMessage));
        } else {
            return order;
        }
    } catch (error) {
        console.log('error',error.message)
    }
  }

  async deleteOrderById(id){
    try {
      const order = await this.deleteById(id);
      if(!order){
        throw new Error(`Cant delete order with id ${id}`)
      }else{
        return order
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  async deleteOrders(){
    try {
      const orders = await this.deleteAll();
      if(!orders){
        throw new Error(`Cant find orders`)
      }else{
        return orders
      }
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = OrdersDao;