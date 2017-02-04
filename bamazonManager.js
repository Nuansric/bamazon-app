//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var importedPassword = require("./key.js");
var table =  require("console.table");

//global variables
var delayTimer;

//mySQL
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: importedPassword.mySQLKeys.password,
	database: "bamazon_db"
});

//text the connnection
connection.connect(function(err) {
	
	if (err) throw err;

});

//questions of options for the manager
function managerChoice(){

	//clear timer
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

//display the product table 
function viewProduct(){
	connection.query("SELECT * FROM products", function(err, res){
		if(err) throw err;
		console.log("\n");
		//display the table
		console.table(res);
		console.log("\n");
		
	});

	//wait 1 second before calling the manager questions
	delayTimer = setTimeout(managerChoice, 1 * 1000);

}

//display table of products that is low in quantity (less than 5)
function viewLowInventory(){

	connection.query("SELECT * FROM products WHERE stock_quantity<=5", function(err, res){
		if(err) throw err;
		console.log("\n");
		//dispaly table
		console.table(res);
		console.log("\n");
	});

	//wait 1 second before calling the manager questions
	delayTimer = setTimeout(managerChoice, 1 * 1000);
}

//display questions set requesting the product info
function addInventory(){
	inquirer.prompt([{

		name: "itemID",
		type: "input",
		message: "What is the item ID that you want to add?"
		, validate: function(value) {
		  if (isNaN(value) === false) {
		    return true;
		  }
		  return false;
		}
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

		//local variables based on user answer
		var selectedItem = parseInt(answer.itemID);
		var amountAdded = parseInt(answer.amount);

		//get the product table from the database
		connection.query("SELECT * FROM products", function(err, res){

			if(err) throw err;

			//looking through the response
			for (var i=0; i < res.length; i++){
				//local variable
				var initialStock = res[i].stock_quantity;
				var updatedStock = amountAdded + initialStock;

				//if the user selected item matched the item in the database
				if(res[i].item_id === selectedItem){

					//update the database
					connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updatedStock }, {item_id: selectedItem }], function(err, res){
						
						if (err) throw err;
						
						console.log("Inventory Updated!");

						//display the table
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





