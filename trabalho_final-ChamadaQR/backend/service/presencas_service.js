const presencasRepository = require("../repository/presencas_repository")

async function listar() {
    try {
        const presencas = await presencasRepository.listar()
        return presencas
    } catch (error) {
        throw {id: 500, msg: "Erro ao listar presenças!"}
    }
}

async function registrar(data) {
    for (let i = 0; i < data.length; i++) {
        const aluno = data[i]
        if (!aluno.aluno_id || aluno.presenca == null) {
            throw { id: 400, msg: "Dados obrigatórios faltando." }
        } else if (typeof aluno.presenca !== "boolean") {
            throw { id: 422, msg: "O campo 'presenca' deve ser um booleano (true ou false)." }
        }
    }
    try {
        const presencas = await presencasRepository.registrar(data)
        return presencas
    } catch (error) {
        if (error.id == 400) throw error
        throw {id: 500, msg: "Erro ao registrar presencas!"}
    }
}

module.exports = {
    listar,
    registrar
}