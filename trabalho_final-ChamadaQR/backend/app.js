const express = require("express")
const alunosRouter = require("./router/alunos_router")
const presencasRouter = require("./router/presencas_router")
const cors = require("cors")
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Olá, mundo!")
})

app.use("/alunos", alunosRouter)
app.use("/presencas", presencasRouter)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})