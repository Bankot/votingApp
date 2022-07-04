const db = require("../db/dbConnect")
const ObjectId = require("mongodb").ObjectId

const getPoolById = async (req, res, next) => {
	const { poolId } = req.params
	try {
		const result = await db
			.collection("pools")
			.findOne({ _id: ObjectId(poolId) })
		res.status(200).send(result)
	} catch (err) {
		res.status(400).send("Something went wrong!")
	}
}
module.exports = getPoolById
