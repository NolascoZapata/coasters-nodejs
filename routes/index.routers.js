const express = require('express');
const router = express.Router();
const coastersRoutes = require('./coasters.routes')
const ordersRoutes = require('./orders.routes')
const messagesRoutes = require('./messages.routes')

//middlewares
router.use(express.json())
router.use(express.urlencoded({extended: true}))


//Routes
router.use('/coasters', coastersRoutes)
router.use('/orders', ordersRoutes)
router.use('/messages',messagesRoutes)



module.exports = router
