const express = require("express");
const router = express.Router();
const sellerRequestModel = require("../controller/seller.model");

router.get("/", sellerRequestModel.get_seller);

router.get("/:sellerId", sellerRequestModel.get_seller_by_id);

router.post("/", sellerRequestModel.create_seller);

router.put("/:sellerId", sellerRequestModel.update_seller);

router.delete("/:sellerId", sellerRequestModel.delete_seller);


// credential check
router.post("/login",sellerRequestModel.check_seller)

module.exports = router;
