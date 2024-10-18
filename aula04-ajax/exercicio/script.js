function read() {
    myDiv = $("#myDiv");
    myDiv.html("Carregando dados...");
    request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myDiv.html(this.responseText);
        }
        if (this.readyState == 4 && this.status == 404) {
            myDiv.html("Não funcionou. :'( <br>" + this.responseText);
        }
    }

    request.open("GET", "data.txt", true);
    request.send();
};