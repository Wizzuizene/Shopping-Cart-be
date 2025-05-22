const productService = require("../service/productService");

const createProduct = async (req, res) => {
    const product = await productService.createProduct(req.body);
    res.status(200).json(product);
};

const getProducts = async (req, res) => {
    const products = await productService.getProducts();
    res.status(200).json(products);
};
const getProductsbyId = async (req, res) => {
    const product = await productService.getProductsbyId(req.params.id);
    res.status(200).json(product);

}

const updateProduct = async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
    const product = await productService.deleteProduct(req.params.id);
    res.status(200).json(product);
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct,getProductsbyId };
