const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        title: { type: String, trim: true, required: true, unique: true },
        desc: { type: String, trim: true, required: true },
        price: { type: String, required: true },
        inStock: { type: Number, required: true },
        category: [String],
        img: { type: String, trim: true },
        // likes: { type: Number, default: 0 },
        // disLikes: { type: Number, default: 0 },
    },
    { timestamps: true }
);
productSchema.methods.toJSON = function () {
    const product = this.toObject();
    delete product.__v;
    return product;
};

module.exports = mongoose.model("Product", productSchema);
