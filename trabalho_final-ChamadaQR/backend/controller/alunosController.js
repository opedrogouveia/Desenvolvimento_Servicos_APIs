const alunosService = require("../service/alunosService")

async function listar(req, res) {
    try {
        const alunos = await alunosService.listar()
        res.json(alunos)
    } catch (error) {
        res.json(error)
    }
}

async function inserir(req, res) {
	const aluno = req.body
  	try {
    	const alunoInserido = await alunosService.inserir(aluno)
      	res.json(alunoInserido)
    } catch(error) {
      	res.json(error)
    }
}

async function atualizar(req, res) {
    const id = + req.params.id
    const aluno = req.body
    try {
      const alunoAtualizado = await alunosService.atualizar(id, aluno)
      res.json(alunoAtualizado)
  } catch(error) {
      res.json(error)
    }
}

async function remover(req, res) {
    const id = + req.params.id
    try {
      const aluno = await alunosService.remover(id)
      res.json(aluno)
    } catch(error) {
      res.json(error)
    }
}

module.exports = {
    listar,
    inserir,
    atualizar,
    remover
}