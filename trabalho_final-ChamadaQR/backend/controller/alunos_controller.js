const alunosService = require("../service/alunos_service")

async function listar(req, res) {
    try {
        const alunos = await alunosService.listar()
        res.json(alunos)
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    listar
}