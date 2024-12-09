const admin = require("../config/firebase-admin-config")

async function verifyToken (idToken) {
	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken)
		return decodedToken
	} catch (error) {
		throw new Error("Token inválido.")
	}
}

module.exports = { verifyToken }