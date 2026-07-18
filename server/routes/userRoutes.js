const router = require("express").Router();

const controller = require("../controllers/UsersController");

/* REGISTER */

router.post(
  "/register",
  controller.register
);

/* LOGIN */

router.post(
  "/login",
  controller.login
);

/* BOOKS */

router.get(
  "/books",
  controller.books
);

/* ADD TO WISHLIST */

router.put(
  "/wishlist/:id",
  controller.addWishlist
);

/* GET WISHLIST */

router.get(
  "/wishlist/:id",
  controller.getWishlist
);

/* REMOVE FROM WISHLIST */

router.delete(
  "/wishlist/:id/:bookId",
  controller.removeWishlist
);

module.exports = router;