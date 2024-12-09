const express = require("express")
const router = express.Router()
const alunosController = require("../controller/alunosController")

router.get("/", alunosController.listar)
router.post("/inserir", alunosController.inserir)
router.put("/atualizar/:id", alunosController.atualizar)
router.delete("/remover/:id", alunosController.remover)

module.exports = router