const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const myLoc = "public/imgs";
        cb(null, myLoc);
    },
    filename: function (req, file, cb) {
        const name = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, name);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 2000000000 },
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext !== ".png" && ext !== ".jpg") return cb(new Error("invalid ext"), false);
        cb(null, true);
    },
});

module.exports = upload;
