const knex = require("../database/db")

async function listar() {
    try {
        const presencas = await knex("presencas")
        return presencas
    } catch (error) {
        throw error
    }
}

async function registrar(data) {
    try {
        const presencas = await knex("presencas")
            .insert(data)
            .returning("*")
        await Promise.all(
            data.map(async (aluno) => {
                if (aluno.presenca == false) {
                    await knex("alunos")
                        .where("id", aluno.aluno_id)
                        .increment("faltas", 1)
                    const alunoAtualizado = await knex("alunos")
                        .where("id", aluno.aluno_id)
                        .first()
                    if (alunoAtualizado.faltas > 5) {
                        console.log(alunoAtualizado)
                        await knex("alunos")
                            .where("id", aluno.aluno_id)
                            .update({ situacao: "Reprovado por falta" })
                    }
                }
            })
        )
        return presencas
    } catch (error) {
        throw error
    }
}

module.exports = {
    listar,
    registrar
}