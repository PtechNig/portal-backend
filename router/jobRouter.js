const express = require('express')
const router = express.Router()
const {createJob, allJobs, singleJob, updateJob, deleteJob} = require('../controller/jobController') 


router.post('/createJob',  createJob)
router.get('/allJobs', allJobs)
router.get('/singleJob/:id', singleJob)
router.patch('/updateJob/:id',  updateJob )
router.delete('/deleteJob/:id',  deleteJob)


module.exports = router;