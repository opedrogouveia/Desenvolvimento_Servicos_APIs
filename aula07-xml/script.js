function readXML() {
    table = $("#tableXML");

    req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            dataXML = this.responseXML;
            products = dataXML.getElementsByTagName("product");
            content = "<tr>" +
                        "<th>ID</th>" +
                        "<th>Name</th>" +
                        "<th>Price</th>" +
                    "</tr>";
            for(i = 0; i < products.length; i++){
                id = products[i].getElementsByTagName("id");
                var name = products[i].getElementsByTagName("name");
                price = products[i].getElementsByTagName("price");

                content += "<tr>" +
                            "<td>" + id[0].childNodes[0].nodeValue + "</td>" +
                            "<td>" + name[0].childNodes[0].nodeValue + "</td>" +
                            "<td>" + price[0].childNodes[0].nodeValue + "</td>" +
                        "</tr>";
            }
            table.html(content);
        }
    }

    req.open("GET", "data.xml", true);
    req.send();
}