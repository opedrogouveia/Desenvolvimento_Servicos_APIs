const restify = require("restify")
const errors = require("restify-errors")

const server = restify.createServer({
    name : "loja_de_alguma_coisa",
    version : "1.0.0"
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.listen(8000, function(){
    console.log("%s executing in: %s", server.name, server.url)
})

var knex = require("knex")({
    client : "pg",
    connection : {
        host : "localhost",
        user : "postgres",
        password : "1234",
        database : "bd_dsapi"
    }
})

server.get("/", (req, res, next)=>{
    res.send("Bem-vindo à Loja!")
})

server.get("/produtos", (req, res, next)=>{                 // LISTA OS PRODUTOS
    knex("produtos")
        .then((produtos)=>{
            res.send(produtos)
        }, next)
        .catch((error)=>{
            res.send({ error : "Erro ao listar os produtos." })
        })
})

server.get("/clientes", (req, res, next)=>{                 // LISTA OS CLIENTES
    knex("clientes")
        .then((clientes)=>{
            res.send(clientes)
        }, next)
        .catch((error)=>{
            res.send({ error : "Erro ao listar os clientes." })
        })
})

server.get("/pedidos", (req, res, next)=>{                 // LISTA OS PEDIDOS
    knex("pedidos")
        .then((pedidos)=>{
            res.send(pedidos)
        }, next)
        .catch((error)=>{
            res.send({ error : "Erro ao listar os pedidos." })
        })
})

server.get("/produtos/:nomeProd", (req, res, next)=>{       // RETORNA O PRODUTO
    const prod = req.params.nomeProd
    knex("produtos")
        .where("nome", "like", `%${prod}%`)
        .first()
        .then((produto)=>{
            if(!produto){
                return res.send(new errors.BadRequestError("Produto não encontrado."))
            }
            res.send(produto)
        }, next)
        .catch((err)=>{
            res.send({ err : "Erro ao buscar produto." })
        })
})

server.get("/pedidos/:nomeCli", (req, res, next)=>{             // LISTA OS PEDIDOS DO CLIENTE
    const cli = req.params.nomeCli
    knex("clientes")
        .where("nome", "like", `%${cli}%`)
        .first()
        .then((cliente)=>{
            if (!cliente){
                return res.send(new errors.BadRequestError("Cliente não encontrado."))
            }
            return knex("pedidos")
                .where("cliente_id", cliente.id)
                .then((pedido)=>{
                    if (!pedido){
                        return res.send(new errors.BadRequestError("O cliente não realizou nenhum pedido."))
                    }
                    res.send(pedido)
                })
        }, next)
        .catch((error)=>{
            res.send({ error : "Erro ao listar os pedidos." })
        })
})

server.post("/cadastro", (req, res, next)=>{                // CADASTRO DE CLIENTE
    knex("clientes")
        .insert(req.body)
        .then((resposta)=>{
            if(!resposta){
                return res.send(new errors.BadRequestError("Não foi possível realizar o cadastro."))
            }
            res.send("Cliente cadastrado com sucesso!")
        }, next)
        .catch((error)=>{
            res.send({ error : "Erro ao cadastrar cliente." })
        })
})
    
server.post("/pedido/cliente", (req, res, next)=>{                // NOVO PEDIDO DE CLIENTE
    let {horario, endereco, cliente_id, produtos} = req.body
    if (!horario || horario.trim() === "") {
        horario = new Date().toISOString()
    }
    knex("pedidos")
        .insert({horario, endereco, cliente_id})
        .returning("id")
        .then((result)=>{
            const pedido_id = result[0].id
            const produtos_pedido = produtos.map(produto => {
                return knex("produtos")
                    .where("id", produto.id)
                    .first()
                    .then(result => {
                        if (result.quantidade < produto.quantidade) {
                            return Promise.reject({
                                message: `Quantidade insuficiente para o produto ${produto.id}. Estoque disponível: ${result.quantidade}.`
                            })
                        }
                        const preco = parseFloat(result.preco)
                        if (isNaN(preco)) {
                            return Promise.reject({
                                message: `Preço do produto ${produto.id} está inválido.`
                            });
                        }
                        const totalPreco = produto.quantidade * preco
                        return {
                            pedido_id: pedido_id,
                            produto_id: produto.id,
                            quantidade: parseFloat(produto.quantidade),
                            preco: totalPreco
                        }
                    })
            })
            Promise.all(produtos_pedido)
                .then(produtos => {
                    return knex("pedidos_produtos")
                        .insert(produtos)
                        .then(() => {
                            const estoqueAtualizado = produtos.map(produto => {
                                return knex("produtos")
                                    .where("id", produto.produto_id)
                                    .decrement("quantidade", produto.quantidade)
                            })
                            return Promise.all(estoqueAtualizado)
                                .then(() => {
                                    res.send({
                                        message: "Pedido e produtos adicionados com sucesso!",
                                        pedido: {
                                            id: pedido_id,
                                            horario,
                                            endereco,
                                            cliente_id
                                        },
                                        produtos: produtos.map(produto => ({
                                            produto_id: produto.produto_id,
                                            quantidade: produto.quantidade,
                                            preco: produto.preco
                                        }))
                                    })
                                })
                        })
                })
        }, next)
        .catch((err)=>{
            res.send({ err : "Erro ao adicionar pedido." })
        })
})

server.put("/clientes/:nomeCli", (req, res, next)=>{                  // ALTERAR DADOS CLIENTE
    const cli = req.params.nomeCli  
    knex("clientes")
        .where("nome", cli)
        .update(req.body)
        .then((resposta)=>{
            if(!resposta){
                return res.send(new errors.BadRequestError("Não foi possível alterar os dados do cliente."))
            }
                if(resposta == 1)
                    res.send("Cliente alterado com sucesso!")
                else
                    res.send("Erro ao alterar cliente.")
        }, next)
    })
    
server.put("/produtos/:nomeProd", (req, res, next)=>{                  // ALTERAR DADOS PRODUTO
    const prod = req.params.nomeProd
    knex("produtos")
        .where("nome", prod)
        .update(req.body)
        .then((resposta)=>{
            if(!resposta){
                return res.send(new errors.BadRequestError("Não foi possível alterar os dados do produto."))
            }
                if(resposta == 1)
                    res.send("Produto alterado com sucesso!")
                else
                    res.send("Erro ao alterar produto.")
        }, next)
})

server.put("/pedidos/:idPed", (req, res, next)=>{                  // ALTERAR DADOS PEDIDO
    const ped = req.params.idPed
    knex("pedidos")
        .where("id", ped)
        .update(req.body)
        .then((resposta)=>{
            if (!resposta) {
                return res.send(new errors.BadRequestError("Não foi possível alterar os dados do pedido."))
            }
            if (resposta == 1) {
                res.send("Pedido alterado com sucesso!")
            } else {
                res.send("Erro ao alterar pedido.")
            }
        }, next)
})

server.del("/clientes/:nomeCli", (req, res, next)=>{             // REMOVE O CLIENTE
    const cli = req.params.nomeCli
    knex("clientes")
        .where("nome", cli)
        .delete()
        .then((resposta)=>{
            if (!resposta) {
                return res.send(new errors.BadRequestError("O cliente não foi removido."))
            }
            if (resposta == 1) {
                res.send("Cliente removido com sucesso!")
            } else {
                res.send("Erro ao remover cliente.")            
            }
        }, next)
})

server.del("/produtos/:nomeProd", (req, res, next)=>{             // REMOVE O PRODUTO
    const prod = req.params.nomeProd
    knex("produtos")
        .where("nome", prod)
        .delete()
        .then((resposta)=>{
            if (!resposta) {
                return res.send(new errors.BadRequestError("O produto não foi removido."))
            }
            if (resposta == 1) {
                res.send("Produto removido com sucesso!")
            } else {
                res.send("Erro ao remover produto.")            
            }
        }, next)
})

server.del("/pedidos/:idPed", (req, res, next)=>{             // REMOVE O PEDIDO
    const ped = req.params.idPed
    knex('pedidos_produtos')
        .where('pedido_id', ped)
        .delete()
        .then(() => {
            return knex('pedidos')
                .where('id', ped)
                .delete()
        })
        .then((resposta)=>{
            if (!resposta) {
                return res.send(new errors.BadRequestError("O pedido não foi removido."))
            }
            res.send("Pedido removido com sucesso!")
        }, next)
        .catch((err) => {
            res.send({ err : "Erro ao remover pedido." })
        })
})