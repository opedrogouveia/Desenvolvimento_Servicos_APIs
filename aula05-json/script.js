click = false;
editing = false;
idProduct = 0;

function readJson() {
    if (!click) {
        request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                divJson = $("#divJson");
                objJson = JSON.parse(this.responseText);
                txt = "<br>Name: " + objJson.name + "<br>";
                txt += "Age: " + objJson.age + "<br>";
                
                txt += "Qualifications: ";
                objJson.qualifications.forEach(value => {
                    txt += "<br><i>" + value + "</i>";
                });
                txt += "<br>Year Of Graduation: " + objJson.yearOfGraduation;
                txt += "<br>Spouse: " + objJson.spouse.name + " - Age: " + objJson.spouse.age;
                if (objJson.hasChildren) {
                    txt += "<br>Children: ";
                    objJson.children.forEach(child => {
                        txt += "<br><i>" + child.name + "</i> - Age: " + child.age;
                    });
                }
                divJson.html(txt);
                click = true;
            }
        };
        request.open("GET", "myJSON.json", true);
        request.send();
    } else {
        $("#divJson").html("");
        click = false;
    }
}

function searchProducts() {
    request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            content = "<tr>" +
            "<th>ID</th>" +
            "<th>Name</th>" +
            "<th>Price</th>" +
            "<th>Remove</th>" +
            "</tr>";
            objJson = JSON.parse(this.responseText);
            if (objJson.answer) {
                alert(objJson.answer);
            } else {
                objJson.products.forEach(prod => {
                    content += "<tr>" +
                    "<td>" + prod.id + "</td>" +
                    "<td>" + prod.name + "</td>" +
                    "<td>" + prod.price + "</td>" +
                    "<td><button onclick='remove(" + prod.id + ", \"" + prod.name + "\")'> X </button></td>" +
                    "<td><button onclick='loadForm(" + prod.id + ", \"" + prod.name + "\", " + prod.price + ")'> Edit </button></td>" +
                    "</tr>";
                });
                $("#tblProducts").html(content);
            }
        };
    }
    request.open("GET", "server.php?search", true);
    request.send();
}

function loadForm(id, name, price) {
    editing = true;
    idProduct = id;
    $("#txtName").val(name);
    $("#txtPrice").val(price);
    $("#saveButton").html("Save");
}

function register() {
    request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            objJson = JSON.parse(this.responseText);
            alert(objJson.answer);
            searchProducts();
        }
    };
    var name = $("#txtName").val();
    price = $("#txtPrice").val();
    price = price.replace(",", ".");
    if (name == "" || price == "") {
        alert("Fill out the fields!")
    } else if (editing) {
        request.open("POST", "server.php?edit", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send("name=" + name + "&price=" + price + "&id=" + idProduct);
        $("#saveButton").html("Register");
        editing = false;
        idProduct = 0;
    } else {    
        request.open("POST", "server.php?insert", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send("name=" + name + "&price=" + price);
    }
    $("#txtName").val("");
    $("#txtPrice").val("");
}

function remove(id, name) {
    confirmDelete = confirm("Delete product *" + name + "* ?");
    if (confirmDelete) {
        request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                objJson = JSON.parse(this.responseText);
                alert(objJson.answer);
                searchProducts();
            }
        };
        request.open("GET", "server.php?remove&id=" + id, true);
        request.send();
    }
}