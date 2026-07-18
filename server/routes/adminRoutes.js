const router=
require("express")
.Router();

const controller=
require(
"../controllers/AdminControllers"
);

/* ADMIN */

router.post(
"/register",
controller.register
);

router.post(
"/login",
controller.login
);

/* USERS */

router.get(
"/users",
controller.users
);

router.put(
"/manage/:id",
controller.manageUser
);

router.get(
"/history/:id",
controller.history
);

router.put(
"/history/:id",
controller.addHistory
);

/* SELLERS */

router.get(
"/sellers",
controller.sellers
);

router.put(
"/approve/:id",
controller.approve
);

router.put(
"/block/:id",
controller.block
);

module.exports=
router;