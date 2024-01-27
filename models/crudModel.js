const mongoose = require("mongoose");
const crudSchema = mongoose.Schema({
  userID: String,
  user: String,
  title: String,
  description: String,
});

const CrudModel = new mongoose.model("data", crudSchema);
module.exports = { CrudModel };
