const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userId: { type: String, required: true },
    products: [
        {
            productId: String,
            quantity: {
                type: String,
                default: 1,
            },
        },
    ],
});

module.exports = mongoose.model("Cart", cartSchema);
