const mongoose = require('mongoose')

const applicationModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
        lowercase: true,
        unique: true
    },

    telephone : {
        type : Number,
        required : [true, 'Telephone number is required'],
        match: /^\d{10}$/
    },

    file : {
        type : String,
        required : [true, 'File is required'],
    }
})

module.exports = mongoose.model('Application', applicationModel)