const alunosRepository = require("../repository/alunosRepository")

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

async function inserir(aluno) {
    if (!aluno || !aluno.nome || !aluno.matricula) {
        throw { id: 400, msg: "Dados obrigatórios faltando." }
    }
    try {
        const alunoInserido = await alunosRepository.inserir(aluno)
        return alunoInserido 
        
    } catch (error) {
        if (error.id === 400) throw error
        throw { id: 500, msg: "Erro ao inserir o aluno." }
    }
}

async function atualizar(id, aluno) {
    if (!aluno || !aluno.nome || !aluno.matricula || !aluno.faltas || !aluno.situacao) {
        throw { id: 400, msg: "Dados obrigatórios faltando." }
    }
    try {
        const alunoAtualizado = await alunosRepository.atualizar(id, aluno)
        if (alunoAtualizado && alunoAtualizado.length > 0) {
            return alunoAtualizado
        } else {
            throw { id: 404, msg: "Aluno não encontrado." }
        }
    } catch (error) {
        if (error.id === 400) throw error
        if (error.id === 404) throw error
        throw { id: 500, msg: "Erro ao atualizar os dados do aluno." }
    }
}

async function remover(id) {
    try {
        const aluno = await alunosRepository.remover(id)
        if (aluno && aluno.length > 0) {
            return aluno
        } else {
            throw { id: 404, msg: "Aluno não encontrado." }
        }
    } catch (error) {
        if (error.id === 404) throw error
        throw { id: 500, msg: "Erro ao remover o aluno." }
    }
}

module.exports = {
    listar,
    inserir,
    atualizar,
    remover
}