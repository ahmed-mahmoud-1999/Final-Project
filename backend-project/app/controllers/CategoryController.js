const categoryModel = require("../database/models/Category");

class Category {
    static all = async (req, res) => {
        try {
            const categories = await categoryModel.find();
            res.status(200).send({
                ok: true,
                message: "successful request",
                data: categories,
            });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
    static add = async (req, res) => {
        try {
            const category = await categoryModel.create(req.body);
            res.status(200).send({
                ok: true,
                message: "added successfully",
                data: category,
            });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
    static delete = async (req, res) => {
        try {
            let category;
            if (req.params.id) category = await categoryModel.findByIdAndDelete(req.params.id);
            res.status(200).send({
                ok: true,
                message: "deleted successfully",
                data: category,
            });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
    static edit = async (req, res) => {
        try {
            let category = await categoryModel.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).send({
                ok: true,
                message: "edited successfully",
                data: category,
            });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
}
module.exports = Category;
