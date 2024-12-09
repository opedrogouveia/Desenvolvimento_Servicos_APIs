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

async function inserir(aluno) {
    try {
        const novoAluno = await knex("alunos")
            .insert(aluno)
            .returning("*")
        return novoAluno
    } catch (error) {
        throw error
    }
}

async function atualizar(id, aluno) {
    try {
        const alunoAtualizado = await knex("alunos")
            .where("id", id)
            .update(aluno)
            .returning("*")
        return alunoAtualizado
    } catch (error) {
        throw error
    }
}

async function remover(id) {
    try {
        const aluno = await knex("alunos")
            .where("id", id)
            .del()
            .returning("*")
        return aluno
    } catch (error) {
        throw error
    }
}

module.exports = {
    listar,
    buscarPresenca,
    inserir,
    atualizar,
    remover
}