const jwt = require("jsonwebtoken")
require("dotenv").config()
const authenticationMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		next(new Error("No token provided"))
	}
	try {
		const token = authHeader.split(" ")[1]
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const { id, login } = decoded
		req.user = { id, login }
		next()
	} catch (error) {
		next(Error("Not authorized to access this route"))
	}
}

module.exports = authenticationMiddleware
