const userRegister = require("./userRegister")
const userLogin = require("./userLogin")
const createPool = require("./createPool")
const voteInPool = require("./voteInPool")
const getPoolsByUser = require("./getPoolsByUser")
const getPools = require("./getPools")
const getPoolById = require("./getPoolById")
const getUserById = require("./getUserById")
module.exports = {
	getUserById,
	userRegister,
	userLogin,
	createPool,
	voteInPool,
	getPoolsByUser,
	getPools,
	getPoolById,
}
