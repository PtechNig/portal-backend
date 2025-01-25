const express = require('express')
const router = express.Router()
const contact = require('../controller/contactController')


router.post('/contact', contact)



module.exports = router;