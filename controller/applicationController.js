const applicationModel = require('../model/applicationModel')
const mailer = require('../utils/mailer')


const GlobalError = require('../utils/globalErrorHandler')

exports.application = async (req, res, next) => {
    const {name, email, telephone} = req.body
    const file = req.file 


    if(!name ||!email ||!telephone ||!file){
        return next(new GlobalError('All fields are required', 400))
    }

    const user = await applicationModel.findOne({email})

    if(user){
        return next(new GlobalError('Application already submitted by this email', 400))
    }

    const application = await applicationModel.create({
        name, email, telephone, 
        file : file.filename
    })


        // Email details
        const subject = "Application Submitted Successfully";
        const text = `Hi ${application.name},\n\nYour Application is duly received,\n\nWe will get back to your soon\n\nThank you.`;
    
        // Send email
        await mailer(application.email, subject, text);

    res.status(201).json({
        status : "success",
        message: 'Application submitted successfully',
    })
}