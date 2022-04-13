//Import Express
const express = require("express");
//Import mongoose
const { default: mongoose } = require("mongoose");
//Import body parser to parse incoming payload
const bodyParser = require("body-parser");
// //Import FormData
// const FormData = require("form-data");
//For Environment config
require("dotenv/config");
//Express
const app = express();
//Add Body Parser as middleware
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
//ROUTES IMPORT
const postRoute = require("./routes/posts");

mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true }, () =>
  console.log("DB CONNECTION DONE")
);

//MIDDLE WARE, it means on /post we will go to post route , farely obv
app.use("/post", postRoute);

app.listen(3000);
