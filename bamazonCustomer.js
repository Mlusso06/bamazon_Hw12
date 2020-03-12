// Adding the required dependancies for the NPM products
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // This will be the port to use for mySQL
  port: 3306,

  // Your username
  user: "Mlusso06",

  // Your password
  password: "thispasswrd",
  database: "bamazon_DB"
});
var stock;
var newStock;

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // console.log to verify connection
  console.log('\n');
  console.log("You are ready to Bamazon");
  console.log('\n');
  // run the start function after the connection is made to prompt the user
  startShopping();
});
// Start the function to load the availble items table to let the customer choose 
function startShopping() {
  // Selects all of the data from the MySQL products table
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    // Draw the table in the terminal using the response
    console.table(res);
    console.log('------------------');

    // let the Customer pick a product
    var choiceArray = [];
    // loop through all the bamzon products
    for (var i = 0; i < res.length; i++) {
      choiceArray.push(res[i].product_name);
    }

    // Then prompt the customer for their choice of product, pass all the products to promptCustomerForItem
    inquirer.prompt([
      {
        type: 'list',
        message: 'Which item are you would you like pick today?',
        name: 'itemQuery',
        choices: choiceArray
      },
      {
        type: 'input',
        message: 'How many do you want to purchase?',
        name: 'numItems'
      }
    ])
      .then(function (answer) {
        // review the stock of the items from the list of inventory
        stock = res[choiceArray.indexOf(answer.itemQuery)].stock_quantity;
        newStock = stock - answer.numItems;
        // if the inventory is less than or equal to the items in stock
        if (answer.numItems <= stock) {
          connection.query(
            // update teh database with the new inventory
            "UPDATE products SET ? WHERE ?",
            [
              { stock_quantity: newStock },
              { product_name: answer.itemQuery }
            ],
            function (err) {
              if (err) throw err;
              console.log('Thanks for shopping at Bamazon!');
              // ask the customer if they want to keep on shopping
              continueShopping();
            }
          );
          // if the customer ask for more than what is in inventory
        } else if (answer.numItems > stock) {
          // explain to the customer the situation
          console.log('Not enough inventory check back later.');
          // ask the customer if they want to keep on shopping
          continueShopping();
        }
      });

  });

};
// startShopping();

// ask the customer if they want to shop
function continueShopping() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Continue shopping?',
      name: 'continueShopping',
      choices: ['Yes', "No"]
    }
  ]).then(function(answer) {
    if (answer.continueShopping === 'Yes') {
      startShopping();

    } else {
      console.log('Come back when you are ready to Bamazon.');
      // end this session
      connection.end();
    }
  });
};
