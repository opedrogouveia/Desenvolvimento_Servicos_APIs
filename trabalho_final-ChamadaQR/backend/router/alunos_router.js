const express = require("express")
const router = express.Router()
const alunosController = require("../controller/alunos_controller")

router.get("/", alunosController.listar)

module.exports = router