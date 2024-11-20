function add() {
    const name = $("#txtName").val()
    let price = $("#txtPrice").val()

    if (name.length == 0) {
        alert("The 'name' field must be filled out.")
    } else {
        if (price.length == 0)
            price = "0.00"
        let ajax = new XMLHttpRequest()
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("Product " + name + " added succesfully!")
                searchProducts()
            } else if (this.readyState == 4) {
                alert(this.status + "\n" + this.responseText)
            }
        }
        ajax.open("POST", "http://localhost:8001/product")
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        ajax.send("name=" + name + "&price=" + price)
    }
}

function searchProducts() {
    const table = $("#tblProducts")[0]

    ajax = new XMLHttpRequest()
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const object = JSON.parse(this.responseText)
            object.forEach(prod => {
                if ($("#p" + prod.id).length === 0) {
                    row = table.insertRow(-1)
                    row.id = "p" + prod.id
                    cellId = row.insertCell(0)
                    cellName = row.insertCell(1)
                    cellPrice = row.insertCell(2)
                    cellDelete = row.insertCell(3)

                    cellId.innerHTML = prod.id
                    cellName.innerHTML = prod.name
                    cellPrice.innerHTML = prod.price
                    cellDelete.innerHTML = '<button onclick="remove(' + prod.id + ')">Remove</button>'
                }
            })
        } else if (this.readyState == 4) {
            alert(this.status + "\n" + this.responseText)
        }
    }

    ajax.open("GET", "http://localhost:8001/product")
    ajax.send()
}

function remove(idProd) {
    ajax = new XMLHttpRequest()

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            location.reload()
        }
    }

    ajax.open("DELETE", "http://localhost:8001/product/" + idProd)
    ajax.send()
}