const contactModel = require('../model/contactModel')
const express = require('express')
const router = express.Router()
const asyncErrorHandler = require('../utils/asyncErrorHandler')
const GlobalError = require('../utils/globalErrorHandler')

contact = asyncErrorHandler(async(req, res, next) => {
        const {name, email, message} = req.body

        if(!name || !email || !message){
            return next(new GlobalError('All fields are required', 400))
        }

        const user = await contactModel.create({
            name, email, message 
        })

        res.status(201).json({
            status: 'success',
            message : "Your message is delivered, Thank you for contacting us."
        })
    }
) 

module.exports = contact

