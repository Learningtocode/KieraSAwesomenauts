<?php 
    require_once(__DIR__ . "/Database.php");  
//When you start a session, the session gets an Id. This id stays constant throughout the whole lifetime of the session. 
    session_start();  
//Every time regenerate is called upon, it will delete the old seesion and create a new one.  
//This is so it makes it difficult for hackers to log into our session.
    session_regenerate_id(true);
    
//$path is helping us access files within our database.    
    $path = "/KieraSAwesomenauts/php/"; 
     
    $host = "localhost"; 
    $username = "root"; 
    $password = "root";  
//Helping us to easily access our database.
    $database = "awesomenauts_db"; 
     
//New Database is the object that will be stored in connection. 
//Connection is the the connection to our local data base.  
//We must determine if the session connection variable exist.  
//We can use Sessions to store whether or not the user has been logged in.
    if(!isset($_SESSION["connection"])) { 
        $connection = new Database($host, $username, $password, $database); 
        $_SESSION["connection"] = $connection;
    }