const verifyAdmin = (req, res, next) => {
    if (!req.isAdmin)
        return res.status(401).send({ ok: false, message: "not authorizied access" });
    next();
};

module.exports = verifyAdmin;
