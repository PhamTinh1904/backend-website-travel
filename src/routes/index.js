const express = require('express')
const router = express.Router()

router.use('/v1/api', require('./tours'))
router.use('/v1/api', require('./users'))
router.use('/v1/api', require('./auth'))
router.use('/v1/api', require('./reviews'))
router.use('/v1/api', require('./booking'))




module.exports = router