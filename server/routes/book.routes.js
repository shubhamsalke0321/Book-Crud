const express = require("express");
const router = express.Router();

const {
  handleBookStoreController,
  handleBookListController,
  handleBookDeleteController,
  handleBookUpdateController
} = require("../controller/book.controller");

// routes
router.post("/addbook", handleBookStoreController);
router.get("/booklists", handleBookListController);
router.post("/deletebook", handleBookDeleteController);
router.put("/Updatebook", handleBookUpdateController);

module.exports = router;
