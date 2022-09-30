const cartModel = require("../database/models/Cart");
const productModel = require("../database/models/Product");

class Order {
    static addproduct = async (req, res) => {
        try {
            const cart = await cartModel.findOne({ userId: req.id });
            cart.products.push(req.body);
            await cart.save();
            res.status(200).send({
                ok: true,
                message: "Add to the cart successfully",
                data: cart,
            });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
    static getCart = async (req, res) => {
        try {
            const cart = await cartModel.findOne({ userId: req.id });
            const products = [];
            for (let pro of cart.products) {
                const product = await productModel.findById(pro.productId);
                products.push({ product, quantity: pro.quantity });
            }
            res.status(200).send({
                ok: true,
                message: "successful request",
                data: products,
            });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
    static editCart = async (req, res) => {
        try {
            const cart = await cartModel.findOne({ userId: req.id });
            cart.products = req.body;
            await cart.save();
            res.status(200).send({
                ok: true,
                message: "edit the cart successfully",
                data: cart,
            });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
}

module.exports = Order;
