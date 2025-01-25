const mongoose = require('mongoose');

const contactModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
        lowercase: true,
    },


    message : {
        type : String,
        required: true

    },


}, { timestamps: true }); 



module.exports = mongoose.model('Contact', contactModel);
