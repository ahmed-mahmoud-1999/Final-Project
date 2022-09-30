const userModel = require("../database/models/User");
const cartModel = require("../database/models/Cart");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

class User {
    static createAdmin = async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).send({
                ok: false,
                message: "email and password are required",
            });
        const dup = await userModel.findOne({ email });
        if (dup) return res.sendStatus(409);
        try {
            req.body.password = await bcryptjs.hash(password, 15);
            const user = await userModel.create({ ...req.body, isAdmin: true });
            res.status(201).send({
                ok: true,
                message: "added successfully",
                data: user,
            });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
    static register = async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).send({
                ok: false,
                message: "email and password are required",
            });
        const dup = await userModel.findOne({ email });
        if (dup) return res.sendStatus(409);
        try {
            req.body.password = await bcryptjs.hash(password, 15);
            const user = await userModel.create(req.body);
            await cartModel.create({ userId: user._id.toString() });
            res.status(201).send({
                ok: true,
                message: "added successfully",
                data: user,
            });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
    static login = async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).send({
                ok: true,
                message: "email and password are required",
            });
        const user = await userModel.findOne({ email });
        if (!user) return res.status(401).send({ ok: false, message: "Invalid Email" });
        try {
            const match = await bcryptjs.compare(password, user.password);
            if (!match)
                return res.status(401).send({ ok: false, message: "Invalid Password" });
            if (user.tokens.length === 3)
                return res
                    .status(500)
                    .send({ ok: false, message: "Can Not Login With More Than 3 Devices" });
            const accessToken = jwt.sign(
                { _id: user._id, isAdmin: user.isAdmin },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "1d",
                }
            );
            user.tokens.push({ token: accessToken });
            await user.save();
            res.status(200).send({
                ok: true,
                message: "veryfied user",
                data: { user, accessToken },
            });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
    static getUsers = async (req, res) => {
        try {
            const users = await userModel.find({ isAdmin: false });
            res.status(200).send({ ok: true, data: users, message: "successful request" });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
    static deleteUser = async (req, res) => {
        try {
            const user = await userModel.findByIdAndDelete(req.params.id);
            res.status(200).send({ ok: true, data: user, message: "deleted successfully" });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
    static getUsers = async (req, res) => {
        try {
            const users = await userModel.find({ isAdmin: false });
            res.status(200).send({ ok: true, data: users, message: "successful request" });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
    static getSingle = async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id);
            res.status(200).send({ ok: true, data: user, message: "successful request" });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
    static logout = async (req, res) => {
        try {
            const user = await userModel.findById(req.id);
            const Index = user.tokens.findIndex((token) => token.token === req.token);
            if (Index === -1) user.tokens = [];
            user.tokens.splice(Index, 1);
            await user.save();
            res.status(201).send({ ok: true, message: "Logged out successfully" });
        } catch (error) {
            res.status(500).send({ ok: false, message: error.message });
        }
    };
}

module.exports = User;
