process.env.NODE_ENV = "development";
if (process.env.NODE_ENV === "development") require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

//middleware
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//DB connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to DB"))
  .catch(err => console.error(err.message));

//Routes
app.use("/", userRouter);

//Set the port variable
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log("Server listening on port " + PORT));
