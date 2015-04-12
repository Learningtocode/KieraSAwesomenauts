 <?php  
    //Create-db's purpose as of right now is to query the database. It's to create the table for the post. 
    //Require once takes the code in the in another folder and place it in here.
    require_once(__DIR__ . "/../model/config.php");   

     //This is for the the user to interact with our blog. 
    //Salt is to make it harder for hackers to put in their own scripts. 
    //Remeber NULL means it can not be empty.
    $query = $_SESSION["connection"]->query("CREATE TABLE users (" 
            . "id int(11) NOT NULL AUTO_INCREMENT," 
            . "username varchar(30) NOT NULL, "
            . "password char(128) NOT NULL,  "
            . "salt char(128) NOT NULL, " 
            . "exp int(10),"
            . "exp1 int(10)," 
            . "exp2 int(10),"
            . "exp3 int(10),"
            . "exp4 int(10),"
            . "PRIMARY KEY (id))");  
     
   
