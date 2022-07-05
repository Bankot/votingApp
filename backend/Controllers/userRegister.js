const jwt = require("jsonwebtoken")
const db = require("../db/dbConnect")
const bcrypt = require("bcryptjs")

const userRegister = async (req, res, next) => {
	const { login, password } = req.body
	if (login && password) {
		const exists = await db.collection("votingUsers").findOne({ login: login })
		if (exists) {
			res.status(400).send("User already exists!")
			return
		}
		const hashedPassword = await bcrypt.hash(password, 10)

		//create user using DB
		const { insertedId } = await db.collection("votingUsers").insertOne({
			login: login,
			password: hashedPassword,
			pools: [],
			votedIn: [],
		})

		const token = await jwt.sign(
			{ id: insertedId.toString(), login: login },
			process.env.JWT_SECRET
		)
		res.status(200).send({ msg: "Succesfully added an user!", token: token })
	} else {
		res.status(400).send("Please provide all needed information!")
	}
}
module.exports = userRegister
