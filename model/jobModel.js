const mongoose = require('mongoose')

const jobModel = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Job title is required'],
    },

    description : {
        type : String,
        required : [true, 'Job description is required'],
    },
    location : {
        type : String,
        required : [true, 'Job location is required'],
    },
    company : {
        type : String,
        required : [true, 'Company name is required'],
    },
    
    type : {
        type : String,
        required : [true, 'Job type is required'],
    },

    level : {
        type : String,
        required : [true, 'Job title is required'],
    }


})

module.exports = mongoose.model('Job', jobModel)