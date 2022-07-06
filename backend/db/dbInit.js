const db = require("./dbConnect")

const run = async () => {
	await db.dropCollection("pools")
	console.log("Pools dropped")
	await db.dropCollection("votingUsers")
	console.log("Users")
}
run()
