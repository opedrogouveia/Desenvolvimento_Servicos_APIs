const alunosRepository = require("../repository/alunos_repository")

async function listar() {
    try {
        const alunos = await alunosRepository.listar()
        for (let aluno of alunos) {
            const presencas = await alunosRepository.buscarPresenca(aluno.id)
            aluno.total_aulas = presencas.totalAulas
            aluno.faltas = presencas.faltas
            if (aluno.total_aulas > 0) {
                aluno.frequencia = ((aluno.total_aulas - aluno.faltas) / aluno.total_aulas) * 100
                aluno.frequencia = aluno.frequencia.toFixed(2)
            } else {
                aluno.frequencia = (100).toFixed(2)
            }
        }
        return alunos
    } catch (error) {
        throw {id: 500, msg: "Erro ao listar alunos!"}
    }
}

module.exports = {
    listar
}