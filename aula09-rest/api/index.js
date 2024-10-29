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
    prod = "Prod" + (products.lenght + 1)
    products.push(prod)
    res.status(200).send("" + products.lenght)
})

app.post("/product:idProd", (req, res) => {
    index = parseInt(req.params.idProd)
    if (index > products.lenght || index <= 0){
        res.status(200).send("Product not exists.")   
    } else {
        newProd = "New Prod" + index
        index -= 1
        products[index] = newProd
        res.status(200).send("Product updated!")
    }
})

app.delete("/product/:idProd", (req, res) => {
    index = parseInt( req.params.idProd )
    if (index > products.length || index <= 0){
        res.status(200).send("Product not exists.")
    } else {
        index -= 1
        products.splice(index, 1)
        res.status(200).send("Product deleted succesfully!")
    }
})

http.createServer(app).listen(8001, () => {
    console.log("Server running in: https://localhost:8001")
})