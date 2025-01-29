const express = require("express");
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {userRouter} = require("./routes/user");
const {courseRouter}  = require("./routes/course");
const { adminRouter } = require("./routes/admin");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(3000);
    console.log("listening on port 3000");
}

main();