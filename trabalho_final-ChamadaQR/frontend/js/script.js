let presencas = {}

async function listarAlunos() {
    try {
        const table = document.getElementById("tblAlunos")
        table.innerHTML = ""
        const thead = document.createElement("thead")
        const headerRow = document.createElement("tr")
        
        const headerMatricula = document.createElement("th")
        const headerNome = document.createElement("th")
        const headerPresenca = document.createElement("th")
        const headerFaltas = document.createElement("th")
        const headerFrequencia = document.createElement("th")
        const headerSituacao = document.createElement("th")

        headerMatricula.textContent = "Matrícula"
        headerNome.textContent = "Nome"
        headerPresenca.textContent = "Presença"
        headerFaltas.textContent = "Faltas"
        headerFrequencia.textContent = "Frequência (%)"
        headerSituacao.textContent = "Situação"

        headerRow.appendChild(headerMatricula)
        headerRow.appendChild(headerNome)
        headerRow.appendChild(headerPresenca)
        headerRow.appendChild(headerFaltas)
        headerRow.appendChild(headerFrequencia)
        headerRow.appendChild(headerSituacao)

        thead.appendChild(headerRow)
        table.appendChild(thead)

        const response = await fetch("http://localhost:5000/alunos")
        const data = await response.json()
        presencas = {}
        data.forEach((aluno) => {
            const row = document.createElement("tr")

            const cellMatricula = document.createElement("td")
            const cellNome = document.createElement("td")
            const cellPresenca = document.createElement("td")
            const cellFaltas = document.createElement("td")
            const cellFrequencia = document.createElement("td")
            const cellSituacao = document.createElement("td")

            const botaoPresenca = document.createElement("button")
            botaoPresenca.textContent = ""
            botaoPresenca.classList.add("btn-presenca")
            botaoPresenca.onclick = () => alternarPresenca(botaoPresenca, aluno.id)
            
            cellPresenca.appendChild(botaoPresenca)
            
            cellMatricula.textContent = aluno.matricula
            cellNome.textContent = aluno.nome
            cellFaltas.textContent = aluno.faltas
            cellFrequencia.textContent = aluno.frequencia
            cellSituacao.textContent = aluno.situacao

            row.appendChild(cellMatricula)
            row.appendChild(cellNome)
            row.appendChild(cellPresenca)
            row.appendChild(cellFaltas)
            row.appendChild(cellFrequencia)
            row.appendChild(cellSituacao)

            table.appendChild(row)

            presencas[aluno.id] = null
        })
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error)
    }
}

function alternarPresenca(botaoPresenca, alunoId) {
    if (botaoPresenca.innerHTML === "") {
        botaoPresenca.innerHTML = "●"
        botaoPresenca.style.color = "green"
        presencas[alunoId] = true
    } else if (botaoPresenca.innerHTML === "●") {
        botaoPresenca.innerHTML = "F"
        botaoPresenca.style.color = "red"
        presencas[alunoId] = false
    } else if (botaoPresenca.innerHTML === "F") {
        botaoPresenca.innerHTML = ""
        presencas[alunoId] = null
    }
}

async function enviar() {
    try {
        if (Object.values(presencas).includes(null)) {
            alert("Preencha todos os campos!")
            return
        }
        const dadosPresenca = Object.entries(presencas).map(([alunoId, presenca]) => {
            return {
                aluno_id: alunoId,
                presenca: presenca
            }
        })

        const response = await fetch("http://localhost:5000/presencas/registrar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosPresenca)
        })
        if (response.ok) {
            window.alert("Presenças registradas com sucesso!")
            listarAlunos()
        } else {
            window.alert("Erro ao registrar presenças.")
        }
    } catch (error) {
        window.alert("Erro ao enviar os dados: " + error.message)
    }
}