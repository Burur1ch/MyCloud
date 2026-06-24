require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const fileUpload = require("express-fileupload")
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")
const corsMiddleware = require("./middleware/cors.middleware")

const app = express()
const PORT = process.env.PORT || 5000

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => {
            console.log("Server started on port", PORT)
        })
    } catch (e) {
        console.error(e)
    }
}

start()
