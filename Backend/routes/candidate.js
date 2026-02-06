const express = require("express")
const router = express.Router()
const controllers = require("../controllers/cadidatecontroller")


router.post("/create" , controllers.createcandiates )
router.get("/getall" , controllers.getAllCandidates)
router.get("/getbyid/:id" , controllers.getCandidateById)
router.delete("/delete/:id" , controllers.deleteCandidate)
router.put("/updatecandi/:id" , controllers.updateCandidate)

module.exports = router

