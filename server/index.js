const express = require("express")
const upload = require("express-fileupload")
const cors = require("cors")
require("dotenv").config()
const { connect } = require("mongoose")
const dbConnect = require("./db/dbConnect")

const app = express()

dbConnect()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }))
app.use(upload())

app.listen(process.env.PORT, () => console.log(`Server run on port: ${process.env.PORT}`))


