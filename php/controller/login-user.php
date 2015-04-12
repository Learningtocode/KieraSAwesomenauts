<?php
    require_once(__DIR__ . "/../model/config.php");  
    //We now have access to our database.  
     
    //AN array is a series of objects which in this case we are goin to return
    $array = array(
            'exp' => '',
            'exp1' => '',
            'exp2' => '',
            'exp3' => '',
            'exp4' => '',
);
     
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING); 
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);  
    $query = $_SESSION["connection"]->query("SELECT * FROM users WHERE BINARY username = '$username'"); 
    //We are just selecting the password and salt from our users table specifically to the variable username.   
    //We are going to check if there is at less one piece of info in our query.
    //Num_rows will tell us how many rows we get from the database.
    if($query->num_rows == 1) {
        $row = $query->fetch_array(); 
         
        if($row["password"] === crypt($password, $row["salt"])){  
    //We want to store whether or not the user has been authenticated.        
            $_SESSION["authenticated"] = true; 
            $array["exp"] = $row["exp"];
            $array["exp1"] = $row["exp1"];
            $array["exp2"] = $row["exp2"];
            $array["exp3"] = $row["exp3"]; 
            $array["exp4"] = $row["exp4"];
           $_SESSION["name"] = $username; 
        //We are echoing it out this array as one statement using json 
            echo json_encode($array);
        } 
        else {
           echo "Invalid username and password1"; 
        }
    } 
    else {
        echo "Invalid username and password2";
    }


