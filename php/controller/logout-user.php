<?php
    require_once(__DIR__ . "/../model/config.php"); 
     
    unset($_SESSIION["authenticated"]); 
     
    session_destory(); 
    header("Location: " . $path . "index.php");

