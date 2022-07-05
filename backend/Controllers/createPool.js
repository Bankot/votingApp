const db = require("../db/dbConnect")
const ObjectId = require("mongodb").ObjectId

const createPool = async (req, res, next) => {
	const { options, question } = req.body
	const { id, login } = req.user
	console.log(id)
	console.log(login)
	if (options.length > 1 && options.length < 5 && question && login && id) {
		let optionsObj = {}
		options.forEach((n) => {
			optionsObj[n] = []
		})
		console.log(optionsObj)

		const { insertedId } = await db.collection("pools").insertOne({
			createdBy: id,
			question: question,
			options: optionsObj,
			createdAt: new Date(),
		})
		await db
			.collection("votingUsers")
			.updateOne(
				{ _id: ObjectId(id) },
				{ $push: { pools: insertedId.toString() } }
			)
		res.status(200).send({
			data: "Succesfully added a pool!",
			insertedId: insertedId.toString(),
		})
	} else res.status(400).send("Provide valid data!")
}
module.exports = createPool
