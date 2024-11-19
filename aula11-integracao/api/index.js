const restify = require("restify")
const errors = require("restify-errors")

const server = restify.createServer({
    name : "little_store",
    version : "1.0.0"
})

const corsMiddleware = require("restify-cors-middleware2")
const cors = corsMiddleware({
    origins : ["*"]
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.pre(cors.preflight)
server.use(cors.actual)

server.listen(8001, function(){
    console.log("%s executing in: %s", server.name, server.url)
})

var knex = require("knex")({
    client : "mysql",
    connection : {
        host : "localhost",
        user : "root",
        password : "",
        database : "store"
    }
})

server.get("/", function(req, res, next){   // function(){} | função anonima
    res.send("Welcome to our Store!")
})

server.get("/product", (req, res, next)=>{   // ()=>{}  | função anonima
    knex("product")
        .then((data)=>{
            res.send(data)
        }, next)
})

server.get("/product/:idProd", (req, res, next)=>{
    id = req.params.idProd
    knex("product")
        .where("id", id)
        .first()
        .then((data)=>{
            if(!data){
                return res.send(new errors.BadRequestError("Product not found."))
            }
            res.send(data)
        }, next)
})

server.post("/product", (req, res, next)=>{
    knex("product")
    .insert(req.body)
    .then((data)=>{
        if(!data){
                return res.send(new errors.BadRequestError("Product not inserted."))
            }
            res.send(data)
        }, next)
    })
    
server.put("/product/:idProd", (req, res, next)=>{
    id = req.params.idProd
    knex("product")
    .where("id", id)
    .update(req.body)
    .then((data)=>{
        if(!data){
            return res.send(new errors.BadRequestError("Product not edited."))
        }
            if(data == 1)
                res.send("Product edited successfully!")
            else
                res.send("Error editing!")            
        }, next)
    })
    
server.del("/product/:idProd", (req, res, next)=>{
        id = req.params.idProd
        knex("product")
        .where("id", id)
        .delete()
        .then((data)=>{
            if(!data){
                return res.send(new errors.BadRequestError("Product not deleted."))
            }
            if(data == 1)
                res.send("Product deleted successfully!")
            else
                res.send("Error deleting!")            
    }, next)
})

server.get("/client", (req, res, next)=>{
    knex("client")
    .then((data)=>{
        res.send(data)
    }, next)
})

server.get("/client/:idClient", (req, res, next)=>{
    id = req.params.idClient
    knex("client")
        .where("id", id)
        .first()
        .then((data)=>{
            if(!data){
                return res.send(new errors.BadRequestError("Client not found."))
            }
            res.send(data)
        }, next)
})

server.post("/client", (req, res, next)=>{
    knex("client")
    .insert(req.body)
    .then((data)=>{
        if(!data){
                return res.send(new errors.BadRequestError("Client not inserted."))
            }
            res.send(data)
        }, next)
    })
    
server.put("/client/:idClient", (req, res, next)=>{
    id = req.params.idClient
    knex("client")
    .where("id", id)
    .update(req.body)
    .then((data)=>{
        if(!data){
            return res.send(new errors.BadRequestError("Client not edited."))
        }
            if(data == 1)
                res.send("Client edited successfully!")
            else
                res.send("Error editing!")            
        }, next)
    })
    
server.del("/client/:idClient", (req, res, next)=>{
        id = req.params.idClient
        knex("client")
        .where("id", id)
        .delete()
        .then((data)=>{
            if(!data){
                return res.send(new errors.BadRequestError("Client not deleted."))
            }
            if(data == 1)
                res.send("Client deleted successfully!")
            else
            res.send("Error deleting!")
    }, next)
})