const presencasService = require("../service/presencasService")

async function listar(req, res) {
    try {
        const presencas = await presencasService.listar()
        res.json(presencas)
    } catch (error) {
        res.json(error)
    }
}

async function registrar(req, res) {
    const data = req.body
    try {
        const presencas = await presencasService.registrar(data)
        res.json(presencas)
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    listar,
    registrar
}