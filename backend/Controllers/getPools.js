const db = require("../db/dbConnect")

const getPools = async (req, res, next) => {
	try {
		const result = await db.collection("pools").find({}).toArray()
		res.status(200).send(result)
	} catch (err) {
		res.status(400).send("Something went wrong!")
	}
}
module.exports = getPools
