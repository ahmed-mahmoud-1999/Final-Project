const productModel = require("../database/models/Product");
const file = require("fs");
class Product {
    static showAll = async (req, res) => {
        try {
            const category = req.query.category;
            const limit = req.query.limit;
            const pageNum = req.query.pageNum;
            const count = await productModel.count();
            const allProducts = category
                ? await productModel
                      .find({ category: category })
                      .limit(limit)
                      .skip(limit * pageNum)
                : await productModel
                      .find()
                      .limit(limit)
                      .skip(limit * pageNum);
            res.status(200).send({
                ok: true,
                message: "successful request",
                data: allProducts,
                count: count,
            });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
    static addProduct = async (req, res) => {
        try {
            const category = JSON.parse(req.body.category);
            const product = await productModel.create({
                ...req.body,
                category,
                img: req.file?.path || "",
            });
            res.status(200).send({ ok: true, message: "added successfully", data: product });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
    static deleteProduct = async (req, res) => {
        try {
            const product = await productModel.findByIdAndDelete(req.params.id);
            res.status(200).send({ ok: true, message: "deleted successfully", data: product });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
    static editProduct = async (req, res) => {
        try {
            const category = req.body.category ? JSON.parse(req.body.category) : "";
            const img = req.file?.path;
            console.log(req.file);
            let product;
            if (!img && category === "")
                product = await productModel.findByIdAndUpdate(req.params.id, req.body);
            else if (!img && category !== "")
                product = await productModel.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                    category,
                });
            else if (img && category === "") {
                product = await productModel.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                    img,
                });
                file.unlinkSync(product.img);
            } else if (img && category !== "") {
                product = await productModel.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                    img,
                    category,
                });
                file.unlinkSync(product.img);
            }
            res.status(200).send({ ok: true, message: "edited successfully", data: product });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
    static singleProduct = async (req, res) => {
        try {
            const product = await productModel.findById(req.params.id);
            res.status(200).send({ ok: true, message: "uccessful request", data: product });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
}

module.exports = Product;
