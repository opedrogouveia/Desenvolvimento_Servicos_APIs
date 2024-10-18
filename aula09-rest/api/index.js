const express = require("express")
const http = require("http")
const app = express()

products = ["Coke", "Pepsi", "Fanta"]

app.get("/", (req, res) => {
    res.status(200).send("Welcome to our REST-API!")
})

app.get("/product", (req, res) => {
    res.status(200).send(products)
})

app.get("/product/:idProd", (req, res) => {
    index = parseInt(req.params.idProd)
    res.status(200).send(products[index-1])
})

app.post("/product", (req, res) => {
    index = parseInt(req.params.idProd)
    res.status(200).send(products[index-1])
})

http.createServer(app).listen(8001, () => {
    console.log("Server running in: https://localhost:8001")
})