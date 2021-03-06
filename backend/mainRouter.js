const express = require("express")
const {
	userRegister,
	userLogin,
	createPool,
	voteInPool,
	getPoolsByUser,
	getPools,
	getPoolById,
	getUserById,
} = require("./Controllers/")
const authenticationMiddleware = require("./Middleware/auth")
const router = express.Router()

router.route("/user/:id").get(getUserById)
router.route("/userRegister").post(userRegister)
router.route("/userLogin").post(userLogin)
router.route("/user/pools/:userId").get(getPoolsByUser)
router.route("/pools").get(getPools)
router.route("/poolCreate").post(authenticationMiddleware, createPool)
router.route("/pools/id/:poolId").get(getPoolById)
router.route("/pools/vote").post(authenticationMiddleware, voteInPool)
module.exports = router
