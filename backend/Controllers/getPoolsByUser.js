const db = require("../db/dbConnect")
const ObjectId = require("mongodb").ObjectId

const getPoolsByUser = async (req, res, next) => {
	const { userId } = req.params
	if (userId) {
		const results = await db
			.collection("pools")
			.find({ createdBy: userId })
			.toArray()
		res.status(200).send(results)
	} else res.status(400).send("Invalid userId!")
}
module.exports = getPoolsByUser
