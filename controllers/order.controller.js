const OrdersDao = require("../models/daos/orders.dao")
const orders = new OrdersDao()

const getOrdersController = async (req, res, next) => {
  try {
    const ordrs = await orders.getOrders()
    console.log('[GET]==> Get orders')
    res.status(200).json(ordrs)
  } catch (error) {
    console.log( error.message)
    next(error)
  }
}

const getOrderByIdController = async (req, res, next) => {
  try {
    const id = req.params.id
    const ordr = await orders.getOrderById(id);
    console.log('[GET]==> Get Order By Id');
    res.status(200).json(ordr)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

const saveOrderController = async (req,res,next)=>{
  try {
      const newOrder = await orders.createOrder(req.body)
      console.log('[POST]==> Order saved')
      res.status(200).json(newOrder._id)
  } catch (error) {
      console.log(error.message)
      next(error)
  }
}

const deleteOrderByIdController = async (req,res,next)=>{
  try {
    const id = req.params.id
    const deleteOrder = await orders.deleteOrderById(id)
    console.log(`[DELETE]==> Order with id ${id} deleted`)
    res.status(200).json(deleteOrder)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

const deleteOrdersController = async (req, res, next) => {
  try {
    const ordrs = await orders.deleteOrders()
    console.log('[DELETE]==> All orders deleted')
    res.status(200).json(ordrs)
  } catch (error) {
    console.log( error.message)
    next(error)
  }
}


module.exports = {
  getOrdersController,
  getOrderByIdController,
  saveOrderController,
  deleteOrderByIdController,
  deleteOrdersController
}