const express = require('express')
const router = express.Router()
const getUsers = require('../controller/userController')

router.get("/", getUsers)



module.exports = router