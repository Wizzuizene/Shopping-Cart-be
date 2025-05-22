const cartService = require("../service/cartService");

const addToCart = async (req, res) => {
    console.log(req.body);

    const cart = await cartService.addToCart(req.body);
    if (cart.status === "success") {
        res.status(200).json(cart);
    } else {
        res.status(400).json(cart);
    }
};

const getCart = async (req, res) => {
    const cart = await cartService.getCart(req.params.id);
    
    if (cart.status === "success") {
        res.status(200).json(cart);
    } else {
        res.status(400).json(cart);
    }
};

const updateCart = async (req, res) => {
    const cart = await cartService.updateCart(req.body);
    if (cart.status === "success") {
        res.status(200).json(cart);
    } else {
        res.status(400).json(cart);
    }
};

const removeItemFromCart = async (req, res) => {
    const cart = await cartService.removeItemFromCart(req.body);
    if (cart.status === "success") {
        res.status(200).json(cart);
    } else {
        res.status(400).json(cart);
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeItemFromCart,
};