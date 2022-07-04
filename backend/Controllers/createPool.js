const db = require("../db/dbConnect")

const createPool = async (req, res, next) => {
	const { options, question } = req.body
	const { id, login } = req.user
	console.log(id)
	console.log(login)
	if (options.length > 1 && question && login && id) {
		let optionsObj = {}
		options.forEach((n) => {
			optionsObj[n] = []
		})
		console.log(optionsObj)

		await db.collection("pools").insertOne({
			createdBy: id,
			question: question,
			options: optionsObj,
			createdAt: new Date(),
		})
		res.status(200).send("Succesfully added a pool!")
	} else res.status(400).send("Provide valid data!")
}
module.exports = createPool
