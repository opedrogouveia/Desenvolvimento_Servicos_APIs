const knex = require("../database/db")

async function listar() {
    try {
        const alunos = await knex("alunos")
            .orderBy("nome")
        return alunos
    } catch (error) {
        throw error
    }
}

async function buscarPresenca(alunoId) {
    try {
        const totalAulas = await knex("presencas")
            .where("aluno_id", alunoId)
            .count("id as total_aulas")
        const faltas = await knex("presencas")
            .where("aluno_id", alunoId)
            .andWhere("presenca", false)
            .count("id as faltas")
        return {
            totalAulas: totalAulas[0].total_aulas || 0,
            faltas: faltas[0].faltas || 0
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    listar,
    buscarPresenca
}