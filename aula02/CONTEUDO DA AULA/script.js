function validar() {
    nome = document.getElementById("txtNome").value;
    pResult = document.getElementById("pResult");

    if (nome.length == 0) {
        pResult.innerHTML = "O campo 'Nome' é obrigatório.";
        pResult.style.background = "#f00";
        return false;
    } else {
        pResult.innerHTML = "Formulário Validado!";
        pResult.style.background = "#0f0";
        return true;
    }
}