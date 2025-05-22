const authService = require('../service/authService');

const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        if (user.status === "success") {
            res.status(201).json(user);
        } else {
            res.status(400).json(user);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




const login = async (req, res) => {
    try {
        const user = await authService.login(req.body);
        if (user.status === "success") {
            res.status(200).json(user);
        } else {
            res.status(400).json(user);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyOTP = async (req, res) => {
    const user = await authService.verifyOTP(req.body);
    if (user.status === "success") {
        res.status(200).json(user);
    } else {
        res.status(400).json(user);
    }
};
module.exports = { register, login, verifyOTP };

