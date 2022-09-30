const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: { type: String, trim: true, required: true, unique: true },
});

CategorySchema.methods.toJSON = function () {
    const category = this.toObject();
    delete category.__v;
    return category;
};
module.exports = mongoose.model("Category", CategorySchema);
