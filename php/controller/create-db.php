 <?php  
    //Create-db's purpose as of right now is to query the database. It's to create the table for the post. 
    //Require once takes the code in the in another folder and place it in here.
    require_once(__DIR__ . "/../model/config.php");   
     
    //If you are not a user, you can not have access create-db.  
    //Die kills off the program.  
    if(!authenticateUser()) { 
     header("Location: " . $path . "index.php");
     die();
 }
       
    //The name of this table is posts which is a table that stores all the posts on the blog. 
    //NOT NULL means the id can never be empty. AUTO_INCREMENT will give each post a unique id automatically. 
    //255 will be the maxium number of charaters within the title.
    $query = $_SESSION["connection"]->query("CREATE TABLE posts ("
            . "id int(11) NOT NULL AUTO_INCREMENT," 
            . "title varchar(255) NOT NULL,"  
            . "post text NOT NULL,"  
            . "PRIMARY KEY (id))");  
     
    if($query) {
        echo "<p>Successfully created table: posts</p>";
    } 
    else {
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
    }
     //This is for the the user to interact with our blog. 
    //Salt is to make it harder for hackers to put in their own scripts. 
    //Remeber NULL means it can not be empty.
    $query = $_SESSION["connection"]->query("CREATE TABLE users (" 
            . "id int(11) NOT NULL AUTO_INCREMENT," 
            . "username varchar(30) NOT NULL, "
            . "email varchar(50) NOT NULL, "
            . "password char(128) NOT NULL,  "
            . "salt char(128) NOT NULL, "
            . "PRIMARY KEY (id))");  
     
    if($query) {
        echo "<p>Sucessfully created table: users</p>";
    } 
    else {
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
    } 
     
