const express = require("express")
const router = express.Router()

const submissionController = require("../controller/submission.controller")

router.get("/", submissionController.getAll)
router.get("/:id", submissionController.getById)
router.post("/", submissionController.create)
router.put("/:id", submissionController.update)
router.delete("/:id", submissionController.delete)
router.delete("/", submissionController.deleteAll)

module.exports = router