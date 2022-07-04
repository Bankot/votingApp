const jwt = require("jsonwebtoken")
const db = require("../db/dbConnect")
const bcrypt = require("bcryptjs")

const userLogin = async (req, res, next) => {
	const { login, password } = req.body
	if (login && password) {
		//create user using DB
		const user = await db.collection("votingUsers").findOne({ login: login })
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{ id: user._id.toString(), login: login },
				process.env.JWT_SECRET
			)
			res.json({ msg: "Credentials are ok", token: token })
		} else {
			res.status(400).send("Credentials not matching")
		}
	} else res.status(400).send("Please provide all required information.")
}
module.exports = userLogin
