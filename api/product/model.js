const mongoose = require("mongoose");
const productSchema2 = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please include the product name"],
  },
  price: {
    type: String,
    required: [true, "Please include the product price"],
  },
 image: {
    type: String,
    required: true,
  },
});
const Product2 = mongoose.model("Product2", productSchema2);
module.exports = Product2;