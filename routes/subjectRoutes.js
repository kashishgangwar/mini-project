const express = require("express")
const router = express.Router()

const auth = require("../middleware/authMiddleware")
const ctrl = require("../controllers/subjectController")

router.post("/add", auth, ctrl.addSubject)
router.get("/all", auth, ctrl.getSubjects)
router.delete("/delete/:id", auth, ctrl.deleteSubject)

module.exports = router