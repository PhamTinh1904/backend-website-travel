const express = require("express");
const UserController = require("../../controllers/userController");
const router = express.Router();



const {verifyAdmin, verifyUser} = require("../../utils/verifyToken")

router.post("/user/create", UserController.create);
router.get("/users",verifyAdmin, UserController.index);
router.put("/user/update", verifyUser, UserController.update);
router.delete("/user/delete", verifyUser, UserController.delete);
router.get("/user", verifyUser, UserController.UserDetails);

module.exports = router;
