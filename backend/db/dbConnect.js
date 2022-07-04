require("dotenv").config({ path: __dirname + "/./././../.env" })
const { MongoClient, ServerApiVersion } = require("mongodb")
const uri = process.env.MONGO_URI
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
})

module.exports = client.db("recipeApp")
