var mysql = require("mysql");
var inquirer = require("inquirer");
var importedPassword = require("./key.js");
var table =  require("console.table");
var delayTimer;

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: importedPassword.mySQLKeys.password,
	database: "bamazon_db"
});

connection.connect(function(err) {
	if (err) throw err;
	// console.log("connected as id " + connection.threadId);

});

function managerChoice(){

		clearTimeout(delayTimer);

		inquirer.prompt([{

		name: "choice",
		type: "list",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
		message: "What would you like to do?"
		
	}]).then(function(answer){

		switch (answer.choice){
		
		case "View Products for Sale":
			viewProduct();
		break;
		case "View Low Inventory":
			viewLowInventory();
		break;
		case "Add to Inventory":
			addInventory();
		break;
		case "Add New Product":
			addProduct();
		break;
		
		}

	})//then

}//managerChoice

function viewProduct(){
	connection.query("SELECT * FROM products", function(err, res){
		if(err) throw err;
		console.log("\n");
		console.table(res);
		console.log("\n");
		
	});

	delayTimer = setTimeout(managerChoice, 1 * 1000);

}

function viewLowInventory(){
	connection.query("SELECT * FROM products WHERE stock_quantity<=5", function(err, res){
		if(err) throw err;
		console.log("\n");
		console.table(res);
		console.log("\n");
	});

	delayTimer = setTimeout(managerChoice, 1 * 1000);
}
function addInventory(){
	inquirer.prompt([{

		name: "itemID",
		type: "input",
		message: "What is the item ID that you want to add?"
	},{
		name: "amount",
		type: "input",
		message: "What is the quantity that you would like to add?"
		, validate: function(value) {
		  if (isNaN(value) === false) {
		    return true;
		  }
		  return false;
		}
	}]).then(function(answer){

		var selectedItem = parseInt(answer.itemID);
		var amountAdded = parseInt(answer.amount);

		connection.query("SELECT * FROM products", function(err, res){

			if(err) throw err;

			for (var i=0; i < res.length; i++){

				var initialStock = res[i].stock_quantity;
				var updatedStock = amountAdded + initialStock;

				if(res[i].item_id === selectedItem){

					connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updatedStock }, {item_id: selectedItem }], function(err, res){
						
						if (err) throw err;
						console.log("Inventory Updated!");

						viewProduct();
					
					});//update database
				}//if
			}//loop

		});//database

	})//then


}
function addProduct(){
	inquirer.prompt([{

		name: "itemName",
		type: "input",
		message: "What is the name of the product that you want to add?"
		, validate: function(value) {
		  if (value == '') {
		    return false;
		  }
		  return true;
		}
	},{
		name: "department",
		type: "input",
		message: "Which department does this product belongs to?"
		, validate: function(value) {
		  if (value == '') {
		    return false;
		  }
		  return true;
		}
	},{
		name: "itemPrice",
		type: "input",
		message: "What is the asking price of this item?"
		, validate: function(value) {
		  if (isNaN(value) === false) {
		    return true;
		  }
		  return false;
		}

	},{
		name: "amountAdded",
		type: "input",
		message: "What is the quantity that you would like to add?"
		, validate: function(value) {
		  if (isNaN(value) === false) {
		    return true;
		  }
		  return false;
		}
	}]).then(function(answer){

		var productName = answer.itemName;
		var productDept = answer.department;
		var quantity = parseInt(answer.amountAdded);
		var itemPrice = parseFloat(answer.itemPrice);

		connection.query("INSERT INTO products SET ?", [{product_name: productName, department_name: productDept, price: itemPrice, stock_quantity: quantity}], function(err, res){

			if (err) throw err;
			console.log("New Item Sucessfully added!");
			
			viewProduct();

		});
		
	});

}

managerChoice();





