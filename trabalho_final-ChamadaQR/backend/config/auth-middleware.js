const authService = require("../service/authService")

function verifyToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1]
    if (!token) return res.status(401).json({ error: "Token não fornecido!" })
    try {
        authService.verifyToken(token)
        next()
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
}

module.exports = { verifyToken }