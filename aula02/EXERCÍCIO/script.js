soma = 0;

function validar() {
    valor = document.getElementById("numero").value;
    result = document.getElementById("result");
    lista = document.getElementById("lista");

    if (valor.length == 0) {
        result.innerHTML = "O campo 'Número' é obrigatório.";
        document.getElementById("numero").value = "";
        return false;
    } else if (isNaN(valor) || valor % 2 == 1) {
        result.innerHTML = "Digite um número par.";
        document.getElementById("numero").value = "";
        return false;
    } else {
        result.innerHTML = "+ " + valor + "!";
        newElement = document.createElement("li");
        newElement.textContent = "+ " + valor;
        lista.appendChild(newElement);
        document.getElementById("numero").value = "";
        somar();
        return false;
    }
}

function somar() {
    total = document.getElementById("total");
    soma += parseInt(valor);
    total.innerHTML = "Total: " + soma;
    return false
}

// 03/09/24

$("#myDiv").css("width", "300px");
$("#myDiv").css("height", "200px");
$("#myDiv").css("background-color", "#f0f");
$("#myDiv").css("color", "#fff");
$("#myDiv").css("padding", "10px");
$("#myDiv").html("<u>Olá</u>");
// $("#myDiv").text("Olá");
// $("#myDiv").hide(3000);
$("#myDiv").fadeOut(3000);

$("#btChange").click(function(){
    // $("#myDiv").show();
    // $("#myDiv").toggle(1000);
    // $("#myDiv").fadeIn(1000);
    $("#myDiv").fadeToggle(5000, function() {
        alert("Execução concluída!");
    });
});