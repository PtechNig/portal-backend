const otpGenerator = require('otp-generator');

// Generate OTP and set expiration time
const generateOtp = () => {
    const otp = otpGenerator.generate(4, { upperCase: false, specialChars: false, digits: true });
    const expiresAt = Date.now() + 5 * 60 * 1000; // Current time + 5 minutes in milliseconds
    return { otp, expiresAt };
};

module.exports = generateOtp;
