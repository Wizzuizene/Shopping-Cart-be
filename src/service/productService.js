const Product = require('../models/Product');

const createProduct = async (productData) => {
    const product = await Product.create(productData);
    if (product) {
        return {
            status: "success",
            data: {
                message: "Thêm sản phẩm thành công",
                data: product,
            },
        };
    }
    return {
        status: "fail",
        data: {
            message: "Thêm sản phẩm thất bại",
        },
    };
};

const getProducts = async () => {
    const products = await Product.find();
    if (products.length === 0) {
        return {
            status: "fail",
            data: {
                message: "Không có sản phẩm nào",
            },
        };
    }
    return {
        status: "success",
        data: {
            message: "Lấy danh sách sản phẩm thành công",
            data: products,
        },
    };
};

const getProductsbyId = async (productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        return {
            status: "fail",
            data: {
                message: "Không tìm thấy sản phẩm",
            },
        };
    }
    return {
        status: "success",
        data: {
            message: "Lấy sản phẩm thành công",
            data: product,
        },
    };
};

const updateProduct = async (productId, productData) => {
    const product = await Product.findByIdAndUpdate(productId, productData, { new: true });
    if (product) {
        return {
            status: "success",
            data: {
                message: "Cập nhật sản phẩm thành công",
                data: product,
            },
        };
    }
    return {
        status: "fail",
        data: {
            message: "Cập nhật sản phẩm thất bại",
        },
    };
};

const deleteProduct = async (productId) => {
    const product = await Product.findByIdAndDelete(productId);
    return product;
};



module.exports = { createProduct, getProducts, getProductsbyId, updateProduct, deleteProduct };

