const express = require('express')
const AuthController = require('../../controllers/authController')
const router = express.Router()


router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.Login)





module.exports = router