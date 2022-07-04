const db = require("../db/dbConnect")
const ObjectId = require("mongodb").ObjectId

const voteInPool = async (req, res, next) => {
	let { id } = req.user
	let { poolId, choosenOption } = req.body
	if (!poolId) {
		res.status(404).send("Invalid pool Id!")
		return
	}
	try {
		poolId = ObjectId(poolId)
		id = ObjectId(id)
	} catch (err) {
		res.status(400).send("There's a problem with ObjectId!")
	}
	const user = await db.collection("votingUsers").findOne({ _id: id })
	if (user.votedIn.includes(poolId.toString())) {
		res.status(400).send("You have already voted in that pool!")
		return
	}
	const pool = await db.collection("pools").findOne({ _id: poolId })
	const options = Object.keys(pool.options)
	if (options.includes(choosenOption)) {
		let newOptionsObj = pool.options
		newOptionsObj[choosenOption].push(id.toString())
		await db
			.collection("pools")
			.updateOne({ _id: poolId }, { $set: { options: { ...newOptionsObj } } })
		await db
			.collection("votingUsers")
			.updateOne({ _id: id }, { $push: { votedIn: poolId.toString() } })
	} else res.status(400).send("Invalid option")
	res.status(200).send("Succesfully voted")
}
module.exports = voteInPool
