import uniqid from 'uniqid'
import { DEFAULT_OTP_LIMIT } from 'config/constants'

export const generateId = () => {
    return uniqid()
}

export const generateOTP = (limit = DEFAULT_OTP_LIMIT) => {

    // Declare a digits variable 
    // which stores all digits
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < limit; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
