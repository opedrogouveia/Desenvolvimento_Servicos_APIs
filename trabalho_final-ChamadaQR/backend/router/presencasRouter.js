const express = require("express")
const router = express.Router()
const presencasController = require("../controller/presencasController")

router.get("/", presencasController.listar)
router.post("/registrar", presencasController.registrar)

module.exports = router