const express = require("express")
const {
	userRegister,
	userLogin,
	createPool,
	voteInPool,
	getPoolsByUser,
	getPools,
	getPoolById,
} = require("./Controllers/")
const authenticationMiddleware = require("./Middleware/auth")
const router = express.Router()

router.route("/userRegister").post(userRegister)
router.route("/userLogin").post(userLogin)
router.route("/pool").post(authenticationMiddleware, createPool).get(getPools)
router.route("/pool/:poolId").get(getPoolById)
router.route("/pools/:userId").get(getPoolsByUser)
router.route("/pool/vote").post(authenticationMiddleware, voteInPool)
module.exports = router
