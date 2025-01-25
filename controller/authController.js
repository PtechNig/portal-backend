const userModel = require('../model/userModel')
const GlobalError = require('../utils/globalErrorHandler')
const asyncErrorHandler = require('../utils/asyncErrorHandler')

// Signup route
exports.signup = asyncErrorHandler(async (req, res, next) => {
    const { email, term} = req.body

    const existingUser = await userModel.findOne({email})
    if(existingUser){
        let err = new GlobalError('User exists', 400)
        
        next(err)
        return;
    }

    if(term !== true){
        let err = new GlobalError('Terms must be accepted', 400)
        
        next(err)
        return;
    }

    const user = await userModel.create(req.body)

    res.status(201).json({
        message: 'User created successfully',
        user
    })
})


exports.signin = asyncErrorHandler(async (req, res, next) => {
    const {email, password} = req.body
    
    if(!email || !password){
        let err = new GlobalError('Email and password are required', 400)
        
        next(err)
        return;
    }

    const user = await userModel.findOne({email})
    
    if(!user ){
        let err = new GlobalError('User not found', 404)
        
        next(err)
        return;
    }

    const isMatch = await user.comparePassword(password, user.password)
    
    if(!isMatch){
        let err = new GlobalError('Invalid credentials', 401)
        
        next(err)
        return;
    }

    res.status(200).json({
        message: 'User signed in successfully',
        user
    })
})