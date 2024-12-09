import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"

// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     appId: process.env.APP_ID,
//     measurementId: process.env.MEASUREMENT_ID
// }

const firebaseConfig = {
    apiKey: "AIzaSyC8B7r_ILDUSnd8CsPX7K-OKvVModGY2uM",
    authDomain: "chamadaqr-45d2a.firebaseapp.com",
    projectId: "chamadaqr-45d2a",
    storageBucket: "chamadaqr-45d2a.firebasestorage.app",
    messagingSenderId: "1039662895097",
    appId: "1:1039662895097:web:f006cebb845a03dc34b728",
    measurementId: "G-BK173XS5KZ"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider)
            await result.user.getIdToken()
                .then((idToken) => {
                    fetch("http://localhost:5000/auth/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ idToken: idToken }),
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.redirectTo) {
                                window.location.href = data.redirectTo
                            }
                        })
                        .catch(error => {
                            console.error("Erro ao enviar token para o backend:", error)
                        })
                })
                .catch((error) => {
                        console.error("Erro ao obter idToken:", error)
                    })
    } catch (error) {
        console.error("Erro no login:", error.message, "Erro:", error)
    }
}

document.getElementById("google-login").addEventListener("click", loginWithGoogle)