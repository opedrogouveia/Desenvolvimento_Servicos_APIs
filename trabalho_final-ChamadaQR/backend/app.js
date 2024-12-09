require("dotenv").config()

const express = require("express")
const app = express()
app.use(express.json())

const cors = require("cors")
app.use(cors())

const authMiddleware = require("./config/auth-middleware")
const authRouter = require("./router/authRouter")
const alunosRouter = require("./router/alunosRouter")
const presencasRouter = require("./router/presencasRouter")

const path = require("path")
app.use(express.static(path.join(__dirname, "../frontend")))

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
  	res.send("Olá, mundo!")
})

// app.use(authMiddleware.verifyToken)
app.use("/auth", authRouter)
app.use("/alunos", alunosRouter)
app.use("/presencas", presencasRouter)

app.listen(PORT, () => {
  	console.log(`Servidor rodando em http://localhost:${PORT}`)
})