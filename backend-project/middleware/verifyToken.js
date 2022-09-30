const jwt = require("jsonwebtoken");
const userModel = require("../app/database/models/User");
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            const user = await userModel.findOne({ "tokens.token": token });
            if (user) {
                user.tokens = [];
                await user.save();
            }
            return res.sendStatus(403); //invalid token
        }
        req.id = decoded._id;
        req.isAdmin = decoded.isAdmin;
        req.token = token;
        next();
    });
};

module.exports = verifyToken;
