const globalErrorHandler = require('../utils/globalErrorHandler')
const asyncErrorHandler = require('../utils/asyncErrorHandler')
const jobModel = require('../model/jobModel')
const GlobalError = require('../utils/globalErrorHandler')
const userModel = require('../model/userModel')


exports.createJob = asyncErrorHandler(async(req, res, next) => {
    const job = await jobModel.create(req.body)
    res.status(201).json({
        status: "success",
        data: {
            job
        }
    })
})

exports.allJobs = asyncErrorHandler(async(req, res) => {
    const jobs = await jobModel.find({})
    res.status(200).json({
        status: "success",
        lenght : jobs.length,
        data: {
            jobs
        }
    })
})

exports.singleJob = asyncErrorHandler(async(req, res, next) => {
    const job = await jobModel.findById(req.params.id)
    if (!job) {
        let err = new GlobalError("Job not found", 404)
        next(err)
        return; 
    }
    res.status(200).json({
        status: "success",
        data: {
            job
        }
    })
})

exports.updateJob = asyncErrorHandler(async(req, res, next) => {
    const job = await jobModel.findByIdAndUpdate(req.params.id, req.body, {new: true})


    if (!job) {
        let err = new GlobalError("Job not found", 404)
        next(err)
        return;
    }
    res.status(200).json({
        status: "success",
        data: {
            job
        }
    })
})

exports.deleteJob = asyncErrorHandler(async(req, res, next) => {
    const job = await jobModel.findByIdAndDelete(req.params.id)
    if (!job) {
        let err = new GlobalError("Job not found", 404)
        next(err)
        return;
    }
    res.status(204).json({
        status: "success",
        message: "Job deleted successfully"
    })
})

