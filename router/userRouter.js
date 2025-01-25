const express = require('express')
const router = express.Router()
const {allUsers, singleUser, updateUser, deleteUser, forgetPassword, otpVerification, passwordReset} = require('../controller/userController')


router.get('/allUsers', allUsers)
router.get('/singleUser/:id', singleUser)
router.patch('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)
router.post('/forgetPassword', forgetPassword)
router.post('/otpVerification', otpVerification)
router.patch('/passwordReset/:id', passwordReset)


module.exports = router;