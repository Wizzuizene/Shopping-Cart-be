const User = require('../models/User');
const { generateOTP } = require('../utils');
const nodemailer = require("nodemailer");
const register = async (userData) => {
    try {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            return {
                status: "fail",
                data: {
                    message: "Email đã tồn tại",
                },
            };
        }
        const otp = generateOTP();
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "21522040@gm.uit.edu.vn",
                pass: "dfef shbf qzix zwer",
            },
        });
        const mailOptions = {
            from: "21522040@gm.uit.edu.vn",
            to: userData.email,
            subject: "OTP Verity",
            text: `Mã otp của bạn là ${otp}`,
        };
        console.log(userData);

        await transporter.sendMail(mailOptions);
        const user = new User({
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
            country: userData.country,
            address: userData.address,
            role: userData.role,
            otp: otp,
        });
        await user.save();
        return {
            status: "success",
            data: {
                message: "Đăng ký thành công",
                data: user,
            },
        };
    } catch (error) {
        console.log(error);
    }
};

const verifyOTP = async (data) => {
    const user = await User.findOne({ email: data.email, otp: data.otpValue });
    if (!user) {
        return {
            status: "fail",
            data: {
                message: "OTP không chính xác",
            },
        };
    }
    user.verify = true;
    user.otp = null;
    await user.save();
    return {
        status: "success",
        data: {
            message: "OTP chính xác",
        },
    };

};

const login = async (userData) => {
    const user = await User.findOne({ email: userData.email, password: userData.password });
    if (!user) {
        return {
            status: "fail",
            data: {
                message: "Tài khoản hoặc mật khẩu không chính xác",
            },
        };
    }
    if (!user.verify) {
        return {
            status: "fail",
            data: {
                message: "Tài khoản chưa được xác thực",
            },
        };
    }
    return {
        status: "success",
        data: {
            message: "Đăng nhập thành công",
            data: user,
        },
    };
};

module.exports = { register, login, verifyOTP };

