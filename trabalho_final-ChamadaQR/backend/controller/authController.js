const authService = require("../service/authService")

async function verifyToken (req, res) {
    const { idToken } = req.body
    if (!idToken) return res.status(400).send("Token não fornecido")
    try {
        const userData = await authService.verifyToken(idToken)
        return res.status(200).json({ message: "Login bem-sucedido", redirectTo: "/home.html" })
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
}

module.exports = { verifyToken }
