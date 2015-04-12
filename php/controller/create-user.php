<?php  
//This file is to create the user and store the user in our new database. 
    require_once(__DIR__ . "/../model/config.php"); 
 
//This make sures to validate inputs from users trying to login.
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);  
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING); 
     
    $salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$"; 
 
//Crypt returns a string encyrted using algoriithms like Blowfish.
    $hashedPassword = crypt($password, $salt);  
 
//Makes your usernames case sensitive 
//The database goes over the exact usernamme and will let you know if ther is a userrname that's the same. 
    $use = $_SESSION["connection"]->query("SELECT username FROM users WHERE username='" . $username . "'"); 
    
       
//If username is greater than 0, following the exact specific requirements.
    if (!$use->num_rows > 0) {
    $query = $_SESSION["connection"]->query("INSERT INTO users SET "
            . "username = '$username', "
            . "password = '$hashedPassword', "
            . "salt = '$salt', " 
            . "exp = 0, "  
            . "exp1 = 0, " 
            . "exp2 = 0, "  
            . "exp3 = 0, "  
            . "exp4 = 0, "); 
      
   //I want to know what my username is at all times
    $_SESSION["name"] = $username;

    if ($query) { 
        //need this for Ajax oon index.php
        echo "true";
    } else {
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
    }
} else {
    echo "<p>The username and or email is already registered to the account.</p>";
}
    