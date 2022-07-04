const express = require("express")
const {
	userRegister,
	userLogin,
	createPool,
	voteInPool,
} = require("./Controllers/")
const authenticationMiddleware = require("./Middleware/auth")
const router = express.Router()

router.route("/userRegister").post(userRegister)
router.route("/userLogin").post(userLogin)
router.route("/pool").post(authenticationMiddleware, createPool)
router.route("/pool/vote").post(authenticationMiddleware, voteInPool)
module.exports = router
