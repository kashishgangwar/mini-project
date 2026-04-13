const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

// ROUTES
const authRoutes = require("./routes/authRoutes")
const subjectRoutes = require("./routes/subjectRoutes")
const plannerRoutes = require("./routes/plannerRoutes")

app.use(cors())
app.use(express.json())

// API ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/subjects", subjectRoutes)
app.use("/api/planner", plannerRoutes)

// DB CONNECT
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

app.listen(5000,()=>{
  console.log("Server running on port 5000")
})