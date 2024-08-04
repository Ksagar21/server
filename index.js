const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');
const authRoutes = require("./routes/authroutes");
const adminroutes = require("./routes/adminroutes");
const authMiddleware = require("./middleware/authmiddleware");
const postRoutes = require("./routes/postcalls");
const app = express();
const port = 5000;
const cors =require("cors");
const uri ="mongodb://3.25.237.189:27017/HomeEases";
//const uri = "mongodb://localhost:27017/HEHOMEEASE";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/auth", authRoutes);
// app.use("/api/admin", userRoutes);

app.use
app.use("/api/provider", postRoutes);
// app.use("/api/admin", authMiddleware.adminVerifyToken, postRoutes);
app.use("/api/",adminroutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
