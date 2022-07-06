const db = require("../db/dbConnect")
const ObjectId = require("mongodb").ObjectId

const getUserById = async (req, res, next) => {
	const { id } = req.params
	try {
		const user = await db
			.collection("votingUsers")
			.findOne({ _id: ObjectId(id) })
		res.status(200).json(user)
	} catch (err) {
		res.status(404).send("Something went wrong!")
	}
}
module.exports = getUserById
