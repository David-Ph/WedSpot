require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment
const mongoose = require("mongoose");
const uri = mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true, // must be added
    useNewUrlParser: true, // must be added
    useCreateIndex: true, // use to enable unique data type
    useFindAndModify: false, // use findoneandupdate instead of findandmodify
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

exports.vendor = require("./vendor");
exports.User = require("./user");
exports.Package = require("./package");
exports.Request = require("./request");
exports.Quotation = require("./quotation");
exports.Todo = require("./todo");
exports.Notification = require("./notification");
