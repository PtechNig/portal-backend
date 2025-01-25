const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')

const portalModel = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
        lowercase: true,
        unique: true
    },
    term: {
        type: Boolean,
        required: [true, 'Terms acceptance is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password should be at least 6 characters long'], 
    },

    confirmPassword : {
        type : String,
        validate : {
            validator : function(value) {
                return value == this.password
            },
            message : "Passwords do not match"
        }
    },

    otp: String,
    resetOtpExpires : Date,
}, { timestamps: true }); 

portalModel.pre('save', async function (next) {
    if(!this.isModified('password')){
        return next;
    }

    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
})

portalModel.methods.comparePassword = async function (password, passwordDB) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('Portal', portalModel);
