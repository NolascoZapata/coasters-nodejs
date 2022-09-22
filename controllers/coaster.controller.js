const CoastersDao = require("../models/daos/coasters.dao")
const coasters = new CoastersDao()

const getCoastersController = async (req,res,next)=>{
    try {
        const c = await coasters.getCoasters()
        console.log('[GET]==> Get coasters')
        res.status(200).json(c)
    } catch (error) {
        console.log('error',error.message)
        next(error)
    }
}
const getCoasterByIdController = async (req, res, next) => {
    try {
    const id = req.params.id
    const coaster = await coasters.getOrderById(id);
    console.log('[GET]==> Get Coaster By Id');
    res.status(200).json(coaster)
} catch (error) {
    console.log(error.message)
    next(error)
}
}

module.exports = {
    getCoastersController,
    getCoasterByIdController
}