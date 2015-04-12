<?php
/* 
 * We are going to take all the variables from our game but
 * we are going to pass it over in this file. We are going to filter the input  
 * of those.
 */
require_once(__DIR__ . "/../model/config.php"); 
 
//These are going to be past by the game not the user.
//These are the variable that we need to save our user. 
//WE ARE PUTTING 5 VARIABLES THAT WILL BE PAST FROM THE GAME INTO HERE
$exp = filter_input(INPUT_POST, "exp", FILTER_SANITIZE_STRING);
$exp1 = filter_input(INPUT_POST, "exp1", FILTER_SANITIZE_STRING);
$exp2 = filter_input(INPUT_POST, "exp2", FILTER_SANITIZE_STRING);
$exp3 = filter_input(INPUT_POST, "exp3", FILTER_SANITIZE_STRING);
$exp4 = filter_input(INPUT_POST, "exp4", FILTER_SANITIZE_STRING); 
 
//Code that actually sticks them into our database. 
// A dot to concatinate, which coverts things to our sequal so we can read it 
//The last line means the username is who ever is logged in. 
//UPDATE THE USER TABLE. SET THESE 5 VARIBALE WHERE THEY USE TO BE ONTO THE USERNAME ACCOUNT
$query = $_SESSION["connection"]->query("UPDATE users SET "
    . "exp = $exp, " 
    . "exp1 = $exp1, "  
    . "exp2 = $exp2, "  
    . "exp3 = $exp3, "   
//IT'S GOING TO KNOW YOUR USERNAME BY SESSION GAME ACCOUNT WHICH WE SET WHEN WE CREATE A USER OR SET
    . "exp4 = $exp4, WHERE username = \"" . $_SESSION["name"]. "\""); 
  
//THIS IS TO CHECK IF EVERYTHING IS RUNNING SMOOTHLY ON THIS FILE.
//If the query worked, echo true. Otherwise, we echo out our error.
if($query){
    echo "true";
}else{
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}