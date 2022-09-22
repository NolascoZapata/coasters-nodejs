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

module.exports = getCoastersController