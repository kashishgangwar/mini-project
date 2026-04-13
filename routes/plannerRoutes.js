const express = require("express")
const router = express.Router()

const auth = require("../middleware/authMiddleware")
const ctrl = require("../controllers/plannerController")

router.post("/generate", auth, ctrl.generatePlan)

module.exports = router