
const router = require("express").Router();

const controller = require("../controllers/SellerControllers");

const upload = require("../middlewares/upload");

/* ===========================
   SELLER REGISTER
=========================== */

router.post(
  "/register",
  controller.register
);

/* ===========================
   SELLER LOGIN
=========================== */

router.post(
  "/login",
  controller.login
);

/* ===========================
   ADD BOOK
=========================== */

router.post(
  "/addbook",
  upload.single("image"),
  controller.addBook
);

/* ===========================
   DELETE BOOK
=========================== */

router.delete(
  "/delete/:id",
  controller.deleteBook
);

/* ===========================
   SELLER DASHBOARD
=========================== */

router.get(
  "/dashboard/:id",
  controller.dashboard
);

module.exports = router;