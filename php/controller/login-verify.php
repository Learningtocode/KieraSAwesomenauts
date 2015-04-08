<?php
    require_once(__DIR__ . "/../model/config.php");
      
//The file can be able to use this function to tell if the user is log in or not.
    function authenticateUser()  { 
//We want to tell if session called authenticated hasn't been set. 
//This if statement asks are you logged in?       
        if(!isset($_SESSION["authenticated"])) {
            return false;
        } 
        else { 
//We need to tell if the actual session variable has the info we are looking for.
            if($_SESSION["authenticated"] == true) {
                return false;
            }  
            else {
                return true;
            }
        }
    }

