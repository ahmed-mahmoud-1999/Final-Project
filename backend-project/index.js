const mongoose = require("mongoose");
const PORT = process.env.PORT | 3000;
const app = require("./app/server");

mongoose.connection.once("open", () => {
    console.log("Connected to mongoDB");
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
});
