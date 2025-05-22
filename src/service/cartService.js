const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const addToCart = async (data) => {
    try {
        console.log(data);

        // Kiểm tra tính hợp lệ của các ID
        if (!mongoose.Types.ObjectId.isValid(data.userId) || !mongoose.Types.ObjectId.isValid(data.productId)) {
            return {
                status: "fail",
                data: {
                    message: "ID người dùng hoặc sản phẩm không hợp lệ"
                }
            };
        }

        const userId = new mongoose.Types.ObjectId(data.userId);
        const productId = new mongoose.Types.ObjectId(data.productId);

        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        if (!user) {
            return {
                status: "fail",
                data: {
                    message: "Không tìm thấy người dùng"
                }
            };
        }
        if (!product) {
            return {
                status: "fail",
                data: {
                    message: "Không tìm thấy sản phẩm"
                }
            };
        }

        // Tìm giỏ hàng của user
        let cart = await Cart.findOne({
            user: userId,
            status: "active",
            isDeleted: false
        });

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [{
                    product: productId,
                    quantity: product.quantity,
                    price: product.price
                }]
            });
        } else {
            const existingItemIndex = cart.items.findIndex(
                item => item.product.toString() === productId.toString()
            );

            if (existingItemIndex > -1) {
                cart.items[existingItemIndex].quantity += data.quantity;
            } else {
                cart.items.push({
                    product: productId,
                    quantity: data.quantity,
                    price: product.price
                });
            }
        }

        cart.calculateTotals();
        await cart.save();
        await cart.populate('items.product');

        return {
            status: "success",
            data: {
                message: "Thêm vào giỏ hàng thành công",
                cart: cart
            }
        };
    } catch (error) {
        return {
            status: "fail",
            data: {
                message: `Lỗi khi thêm vào giỏ hàng: ${error.message}`
            }
        };
    }
};

const getCart = async (userIddata) => {
    try {
        const userId = new mongoose.Types.ObjectId(userIddata);

        // Kiểm tra và chuyển đổi userId thành ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return {
                status: "fail",
                data: {
                    message: "ID người dùng không hợp lệ"
                }
            };
        }
        console.log(userId);

        // Tìm giỏ hàng của user
        const cart = await Cart.findOne({
            user: userId,
            status: "active",
            isDeleted: false
        }).populate('items.product');

        if (!cart) {
            return {
                status: "success",
                data: {
                    message: "Giỏ hàng trống",
                    cart: {
                        items: [],
                        totalPrice: 0,
                        totalItems: 0
                    }
                }
            };
        }

        return {
            status: "success",
            data: {
                message: "Lấy giỏ hàng thành công",
                cart: cart
            }
        };
    } catch (error) {
        return {
            status: "fail",
            data: {
                message: `Lỗi khi lấy giỏ hàng: ${error.message}`
            }
        };
    }
};

const updateCart = async (data) => {
    try {
        // Kiểm tra tính hợp lệ của các ID
        if (!mongoose.Types.ObjectId.isValid(data.userId) || !mongoose.Types.ObjectId.isValid(data.productId)) {
            return {
                status: "fail",
                data: {
                    message: "ID người dùng hoặc sản phẩm không hợp lệ"
                }
            };
        }

        const userId = new mongoose.Types.ObjectId(data.userId);
        const productId = new mongoose.Types.ObjectId(data.productId);

        const product = await Product.findById(productId);
        if (!product) {
            return {
                status: "fail",
                data: {
                    message: "Không tìm thấy sản phẩm"
                }
            };
        }
        const cart = await Cart.findOne({
            user: userId,
            status: "active",
            isDeleted: false
        });

        if (!cart) {
            return {
                status: "fail",
                data: {
                    message: "Không tìm thấy giỏ hàng"
                }
            };
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId.toString()
        );

        if (itemIndex === -1) {
            return {
                status: "fail",
                data: {
                    message: "Không tìm thấy sản phẩm trong giỏ hàng"
                }
            };
        }

        if (data.quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = data.quantity;
            if (product.price) {
                cart.items[itemIndex].price = product.price;
            }
        }

        cart.calculateTotals();
        await cart.save();
        await cart.populate('items.product');

        return {
            status: "success",
            data: {
                message: "Cập nhật giỏ hàng thành công",
                cart: cart
            }
        };
    } catch (error) {
        return {
            status: "fail",
            data: {
                message: `Lỗi khi cập nhật giỏ hàng: ${error.message}`
            }
        };
    }
};

const removeItemFromCart = async (data) => {
    console.log(data);
    
    try {
        if (!mongoose.Types.ObjectId.isValid(data.userId) ||
            !mongoose.Types.ObjectId.isValid(data.cartId) ||
            !mongoose.Types.ObjectId.isValid(data.productId)) {
            return {
                status: "fail",
                data: {
                    message: "ID không hợp lệ"
                }
            };
        }

        const userId = new mongoose.Types.ObjectId(data.userId);
        const cartId = new mongoose.Types.ObjectId(data.cartId);
        const productId = new mongoose.Types.ObjectId(data.productId);

        const cart = await Cart.findOne({
            _id: cartId,
            user: userId,
            status: "active",
            isDeleted: false
        });

        if (!cart) {
            return {
                status: "fail",
                data: {
                    message: "Không tìm thấy giỏ hàng hoặc bạn không có quyền"
                }
            };
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId.toString()
        );

        if (itemIndex === -1) {
            return {
                status: "fail",
                data: {
                    message: "Không tìm thấy sản phẩm trong giỏ hàng"
                }
            };
        }

        cart.items.splice(itemIndex, 1);
        cart.calculateTotals();
        await cart.save();

        return {
            status: "success",
            data: {
                message: "Đã xóa sản phẩm khỏi giỏ hàng",
                cart: cart
            }
        };
    } catch (error) {
        return {
            status: "fail",
            data: {
                message: `Lỗi khi xóa sản phẩm khỏi giỏ hàng: ${error.message}`
            }
        };
    }
};

module.exports = {
    addToCart, getCart, updateCart, removeItemFromCart
};


