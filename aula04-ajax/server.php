<?php
    $value = $_GET["value"];
    $text = "";

    for ($i=1; $i <= $value; $i++) { 
        $text .= $i."<br>";
    }

    echo $text;