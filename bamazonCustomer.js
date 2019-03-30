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
    
    
    
});

function showAll() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        
        askUser();
        
    })

    // connection.query("SELECT * FROM products", function(err, res) {
        
    //     console.log(id, quantity);
    //     console.log(res);
        
    // })
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
            checkAvailability(answer.id, answer.quantity);

            // console.log(answer.id);
            // console.log(answer.quantity);

            // var query = 'SELECT * FROM products';
            // connection.query(query, function(err, res) {
            // // if (err) throw err;
            // console.log(res);

            // // for (var i = 0; i < res.length; i++){
            // //     if (answer.id === res[i].id){
            // //         console.log(res[i]);
            // //     }
            // // }

            // })
            
        })
        
};

function checkAvailability(id, quantity){
    connection.query("SELECT * FROM products",
    function(err, res) {
        if (err) throw err;
        // iterate through the forloop to find the matching product using its item_id
        for (var i = 0; i < res.length; i++){
            // when matching id is found, assign it to new variable
            var selectID = parseInt(res[i].item_id);
            if (parseInt(id) === selectID){
                var chosenItem = res[i];
                if (parseInt(quantity) > chosenItem.stock_qt) {
                    console.log("NOT ENOUGH IN STOCK, Please try your order again");
                    console.log("Product selected: " + chosenItem.product_name);
                    console.log("Quantity selected: " + parseInt(quantity));
                } else {
                    // place the order and deduct the ordered quantity from the database for that specific product
                    // console.log(chosenItem);
                    console.log("order successfully placed");
                    console.log("Product selected: " + chosenItem.product_name);
                    console.log("Quantity selected: " + parseInt(quantity));
                    updateProduct(chosenItem, quantity);
                }
                break;
            }
        }
        

    })

};

function updateProduct(item, quantity) {
    console.log("===================================================");
    console.log("Updating stock quantity for: " + item.product_name);
    // console.log(item, quantity);
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_qt: parseInt(item.stock_qt) - parseInt(quantity)
        },
        {
          item_id: item.item_id
        }
      ],
      function(err, res) {
        if (err) throw err;
        // console.log(res);
        console.log(res.affectedRows + " products updated!\n");
        // console.log("new quantity" + item.stock_qt);
      }
    );
    
    // logs the actual query being run
    // console.log(query.sql);

    console.log("Total cost for this order: $" + parseInt(item.price) * parseInt(quantity));

    connection.end();
  }