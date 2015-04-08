<?php

//Class name usually has to have the same name as the file. 
//Private menas you are only able to access the variable in this file. 
//A constructer will build the object so we can use it. 
//The variables below in class Database are global variables. 
class Database {

    private $connection;
    private $host;
    private $username;
    private $password;
    private $database; 
    public $error; 
 //   public $date; 
 //   public $time;

    public function __construct($host, $username, $password, $database) {
        //$this is relating to the varaibles in the class Database.
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database; 
  //      $this->date = $date; 
  //      $this->time = $time;
         
        //This code below is different from the code in config. 
        $this->connection = new mysqli($host, $username, $password);

        //Die means our program will stop running if there is an error.
        if ($this->connection->connect_error) {
            die("<p>Error: " . $this->connection->connect_error . "</p>");
        }

        //We are going to select that data base in our file.  
        //The server will either say true or not true of the function.
        $exists = $this->connection->select_db($database);

        //Remember ! means it does not.  
        //Queries are questions to the data base in this case we are sending commands. 
        if (!$exists) {
            $query = $this->connection->query("CREATE DATABASE $database");

            //The dot is use to concatenate or link varibles of code.   
            if ($query) {
                echo "<p>Successfully created database: " . $database . "</p>";
            }
        }
        //Since the code will only run when the database doesn't exist, it will only run once if the database was sucessfully created. 
        //This else statement will only apply if the database already exists.
        else {
            echo "<p>Database already exists.</p>";
        }
    }

    //Establishing a connection to our database.
    public function openConnection() {
        //Mysqli is the object that will connect us to the database. 
        //The variables in the parenthesis are four parameters.
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

        //Die means our program will stop running if there is an error.
        if ($this->connection->connect_error) {
            die("<p>Error: " . $this->connection->connect_error . "</p>");
        }
    }

    public function closeConnection() {
        //The purpose of this if statement is to check if I actually opened  the connection.  
        //Isset whether or not the variable has been set and if the is information present in the variable.
        if (isset($this->connection)) {
            //You must remember to close your connection to the database.  
            $this->connection->close();
        }
    }

    public function query($string) {
        //The $this->openConnection is calling upon that function. 
        $this->openConnection();

        //Below is query the connection we have. 
        $query = $this->connection->query($string);  
           
        //We want to know whether or not the query was false.
        if(!$query) {
            $this->error = $this->connection->error;
        }

        $this->closeConnection();

        return $query;
    }

}
