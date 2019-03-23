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
    // showAll();
    askUser();
    connection.end();
    
});

function showAll() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        
        askUser();
        
    });
};

function askUser() {
    
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Enter the item ID of the product you wish to purchase"
            },
            {
                name: "quantity",
                type: "input",
                message: "Enter the quantity you wish to purchase"
            }
        ])
        .then(function(answer){
            // checkAvailability(answer.id, answer.quantity);

            console.log(answer.id);
            console.log(answer.quantity);

            var query = 'SELECT * FROM products';
            connection.query(query, function(err, res) {
            // if (err) throw err;
            console.log(res);

            // for (var i = 0; i < res.length; i++){
            //     if (answer.id === res[i].id){
            //         console.log(res[i]);
            //     }
            // }

            })
            
        })
};

function checkAvailability(id, quantity){
    connection.query("SELECT * FROM products",
    function(err, res) {
        // if (err) throw err;
        console.log(res);

        for (var i = 0; i < res.length; i++){
            if (id === res[i].id){
                console.log(res[i])
            }
        }
    })
    // console.log("checking product availability");
    // console.log(id);
    // console.log(quantity);
    
};