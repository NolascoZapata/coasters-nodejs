const express = require('express');
const router = express.Router();
const {
  getOrdersController,
  getOrderByIdController,
  saveOrderController,
  deleteOrderByIdController,
  deleteOrdersController
} = require('./../controllers/order.controller')


//middlewares
router.use(express.json())
router.use(express.urlencoded({extended: true}))

//Routes
router.get('/',getOrdersController)
router.get('/:id',getOrderByIdController)
router.post('/',saveOrderController)
router.delete('/',deleteOrdersController)
router.delete('/:id',deleteOrderByIdController)


module.exports = router