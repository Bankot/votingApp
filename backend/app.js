const express = require("express")
const app = express()
const mainRouter = require("./mainRouter")
const errorHandler = require("./Middleware/errorHandler")

app.use(express.json())
app.use("/api/", mainRouter)

app.use(errorHandler)
app.listen(5000, console.log("Listening to port 5000"))
