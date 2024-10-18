function read() {
    divInfo = $("#divInformation");  // document.getElementById("divInformation");
    divInfo.html("Loading...");
    request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            divInfo.html(this.responseText); // divInfo.innerHTML = this.responseText;
        }
        if (this.readyState == 4 && this.status == 404) {
            divInfo.html("Resposta: " + this.responseText);
        }
    };

    request.open("GET", "data.txt", true);
    request.send();
};

function numbers() {
    request = new XMLHttpRequest();

    divNumbers = $("#divNumbers");
    divNumbers.html("Loading...");

    request.onreadystatechange = function () {
        if (this.readyState == 0) {
            divNumbers.html(divNumbers.html() + "<br>Request não inicializada."); // request ja inicia em 0, por isso o primeiro if nao ira aparecer
        }
        if (this.readyState == 1) {
            divNumbers.html(divNumbers.html() + "<br>Conexão estabelecida.");
        }
        if (this.readyState == 2) {
            divNumbers.html(divNumbers.html() + "<br>Request recebida no servidor.");
        }
        if (this.readyState == 3) {
            divNumbers.html(divNumbers.html() + "<br>Servidor processando.");
        }
        if (this.readyState == 4 && this.status == 200) {
            divNumbers.html(divNumbers.html() + "<hr>" + this.responseText);
        }
    
    };

    value = $("#txtValue").val();   //  document.getElementById("txtValor").value;
    request.open("GET", "server.php?value=" + value, true);
    request.send();
}