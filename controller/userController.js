const userModel = require('../model/userModel')
const GlobalError = require('../utils/globalErrorHandler')
const asyncErrorHandler = require('../utils/asyncErrorHandler')
const mongoose = require('mongoose');
const mailer = require('../utils/mailer')
const bcrypt = require('bcrypt')

// Getting all users
exports.allUsers = asyncErrorHandler(async (req, res) => {
    const users = await userModel.find({})
    res.status(200).json({
        status: "success",
        data: {
            users
        }
    })
})


// Getting single user with id
exports.singleUser = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        const err = new GlobalError('Invalid User ID format', 400);
        next(err);
        return;
    }

    const user = await userModel.findById(id)

    if (!user) {
        let err = new GlobalError('User not found', 404);
        next(err);
        return;
    }

    res.status(200).json({
        status: "success",
        data: {
            user
        }
    })
})

// Updating user with id
exports.updateUser = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id

    const user = userModel.findById(id)

    if (!user) {
        let err = new GlobalError('User not found', 404);
        next(err);
        return;
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true })

    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser
        }
    })
})

// Deleting user with id

exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id

    const user = await userModel.findById(id)

    if (!user) {
        let err = new GlobalError('User not found', 404);
        next(err);
        return;
    }

    await userModel.findByIdAndDelete(id)

    res.status(204).json({
        status: "success",
        message: "User deleted successfully"
    })
})


exports.forgetPassword = asyncErrorHandler(async (req, res, next) => {
    const { email } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });

    if (!user) {
        return next(new GlobalError('User not found', 404));

    }

    // Generate OTP and expiration time
    const otp = Math.floor(1000 + Math.random() * 9000); // Example: 1234

    // Hash the OTP before storing it in the database
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    const expiresAt = Date.now() + 55 * 60 * 1000;

    // Save OTP and expiration to the user record (or use a separate collection if needed)
    user.otp = hashedOtp;
    user.resetOtpExpires = expiresAt;
    await user.save();

    // Email details
    const subject = "OTP for Password Reset";
    const text = `Hi ${user.username},\n\nKindly find the OTP for your password reset below:\n\n${otp}\n\nPlease note that the OTP is only valid for 5 minutes.\n\nThank you.`;

    // Send email
    await mailer(user.email, subject, text);

    res.status(200).json({
        status: "success",
        message: "OTP for password reset has been sent to your email"
    });
});


exports.otpVerification = asyncErrorHandler(async (req, res, next) => {
    const { email, otp } = req.body;

    const user = await userModel.findOne({ email });
    console.log(user._id)

    if (!user) {
        return next(new GlobalError('User does not exist', 404))
    }

    if (!user.resetOtpExpires || user.resetOtpExpires < Date.now()) {
        return next(new GlobalError('OTP has expired', 400));
    }

    const isMatch = await bcrypt.compare(otp, user.otp);

    if (!isMatch) {
        return next(new GlobalError('Invalid OTP', 404))
    }

    const subject = "Password Reset Link"
    const text = `Hi ${user.username},\n\nClick the link below to reset your password:\n\nhttp://localhost:5173/passwordReset/${user._id}\n\nThis link will expire in 24 hours.\n\nThank you.\n\nBest regards,\nYour Team`;



    await mailer(user.email, subject, text);

    res.status(201).json({
        status: 'success',
        message: " OTP verified, Click on the link in your mail to reset your password",
        userId: user._id
    })
})


exports.passwordReset = asyncErrorHandler(async (req, res, next) => {
    const { password, confirmPassword } = req.body;
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
        return next(new GlobalError('User does not exist', 404));
    }

    if (confirmPassword !== password) {
        return next(new GlobalError('Passwords do not match', 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear OTP-related fields
    await userModel.findByIdAndUpdate(id, {
        password: hashedPassword,
        otp: undefined,
        resetOtpExpires: undefined,
        confirmPassword: undefined,
    });

    res.status(200).json({
        status: 'success',
        message: 'Password reset successfully.',
    });
});
