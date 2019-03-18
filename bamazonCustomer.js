var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "gwcoding",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    showAll();

    
    // prompt user
        // prompt product id
        // prompt desired purchase qt
});

function showAll() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        // connection.end();
        askUser();
    });
};

function askUser() {
    inquirer
        .prompt([
            {
                name: "identify id",
                type: "input",
                message: "Enter the item ID of the product you wish to purchase"
            },
            {
                name: "identify qt",
                type: "input",
                message: "Enter the quantity you wish to purchase"
            }
        ])
        .then(function(answer){
            checkAvailability(answer);
        })
};

function checkAvailability(){
    console.log("checking product availability");
};