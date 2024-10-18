<?php

header("Content-type: application/json");

if (isset($_REQUEST["search"])) {
    try {
        $conn = mysqli_connect("localhost", "root", "", "store");
        if ($conn) {
            $query = "SELECT * FROM product ORDER BY name";
            $result = mysqli_query($conn, $query);
            $rows = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
            mysqli_close($conn);
            echo '{"products":' . json_encode($rows) . '}';
        } else {
            echo '{"answer" : "Error Connecting to Database"}';
        }
    } catch (\Throwable $th) {
        echo '{"answer" : "Error on Server: ' . $th->getMessage() . ' "}';
    }
}

if (isset($_REQUEST["insert"])) {
    try {
        $conn = mysqli_connect("localhost", "root", "", "store");
        if ($conn) {
            $name = $_POST["name"];
            $price = $_POST["price"];

            $query = "INSERT INTO product (name, price) VALUES ('$name', $price);";
            mysqli_query($conn, $query);
            mysqli_close($conn);
            echo '{"answer" : "Product Registered Succesfully!"}';
        } else {
            echo '{"answer" : "Error Connecting to Database"}';
        }
    } catch (\Throwable $th) {
        echo '{"answer" : "Error on Server: ' . $th->getMessage() . ' "}';
    }
}

if (isset($_REQUEST["edit"])) {
    try {
        $conn = mysqli_connect("localhost", "root", "", "store");
        if ($conn) {
            $name = $_POST["name"];
            $price = $_POST["price"];
            $id = $_POST["id"];

            $query = "UPDATE product SET name = '$name', price = $price WHERE id = $id";
            mysqli_query($conn, $query);
            mysqli_close($conn);
            echo '{"answer" : "Product Updated Succesfully!"}';
        } else {
            echo '{"answer" : "Error Connecting to Database"}';
        }
    } catch (\Throwable $th) {
        echo '{"answer" : "Error on Server: ' . $th->getMessage() . ' "}';
    }
}

if (isset($_REQUEST["remove"])) {
    try {
        $conn = mysqli_connect("localhost", "root", "", "store");
        if ($conn) {
            $id = $_GET["id"];
            $query = "DELETE FROM product WHERE id = $id";
            mysqli_query($conn, $query);
            mysqli_close($conn);
            echo '{"answer" : "Product Deleted!"}';
        } else {
            echo '{"answer" : "Error Connecting to Database"}';
        }
    } catch (\Throwable $th) {
        echo '{"answer" : "Error on Server: ' . $th->getMessage() . ' "}';
    }
}