//======Dependencies======
var mysql = require("mysql");
var inquirer = require("inquirer");
var importedPassword = require("./key.js");
var table =  require("console.table");


//Global variables for timer and database store
var delayTimer;
var productLookup ={
	products : null
};

//mySQL database 
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	// port: 3306,
	password: importedPassword.mySQLKeys.password,
	database: "bamazon_db"
});

//check the connection
connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);

});

//look up the database and store response data in the global variable
function getProductLookup(){

	//getting the query response from the mySQL database
	connection.query("SELECT * FROM products", function(err, res){
		
		//store the query response in the gloable object
		productLookup.products = res;
	
	});
}

//look up the phoduct the the user picked by ID
function findProductByID(itemID){

  	for(var x = 0; x < productLookup.products.length; x ++){
  		
  		//if the itemId parameter match the item_id property from the response
  		if(productLookup.products[x].item_id == itemID){

  			//to return the matched object 
  			return productLookup.products[x];
  		}
  	}
}

//obtaining the department table from the database
function getDeptInfo(deptName, totalPurchase){
		
		connection.query("SELECT * FROM departments WHERE ?",[{department_name: deptName}], function(err, res){

			//set the local vairiable to contain the total_sales property value
			var totalSale = res[0].total_sales;

			//set the local vairiable that calculates the new total_sales value which will be used to update the database
			var newSale = totalPurchase + totalSale;
			
			//call the function to update the dapartment table with deptName and newSale passed in	
			updateDepartment(deptName, newSale);
		});
}

//update the products table
function updateProduct(itemID, updatedQuantity){


		connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updatedQuantity}, {item_id: itemID }], function(err, res){

		});

}

//update the departments table
function updateDepartment(departmentName, updatedSale){

		connection.query("UPDATE departments SET ? WHERE ?", [{total_sales: updatedSale}, {department_name: departmentName }], function(err, res){

		});
}


//using console.table package to dis play the respond from the query in the table
function displayTable(){
connection.query("SELECT * FROM products", function(err, res){
	if(err) throw err;

	//display table
	console.table(res);

	//wait 1 second before calling th e startShopping questions
	delayTimer = setTimeout(clearDelay, 1 * 1000);

});//database

} //displayTable

// Function to control the display of the questions
function clearDelay(){

	//clear the 1 seconds timeout
	clearTimeout(delayTimer);

	//call startShopping to display the shpooing question set 
	startShopping();

} // clearDelay function

//the shopping question set
function startShopping(){

	inquirer.prompt([{

		name: "itemID",
		type: "input",
		message: "What is the ID of the item you wish to buy?",
		validate: function(value) { //validate to make sure the answer is a number
		  if (isNaN(value) === false) {
		    return true;
		  }
		  return false;
		}
	},{

		name: "amount",
		type: "input",
		message: "What is the quantity you wish to buy?",
		validate: function(value) {
		  if (isNaN(value) === false) {
		    return true;
		  }
		  return false;
		}
	}]).then(function(answer){

		//local variables the item id that theuser picked	
		var selectedItem = parseInt(answer.itemID);
		//the object returned from the findProductById is stored,, it is the object of item that matches the id the user entered
		var product = findProductByID(selectedItem);

			//if the object is returned, item is found!!
			if(product !== null && product !== undefined){

				//local variable from the database responses
				var initialStock = product.stock_quantity;
				var selectedAmount = parseInt(answer.amount);
				var updateStock = initialStock - selectedAmount;
				var itemPrice = product.price;
				var deptName = product.department_name;
				var totalPurchase = selectedAmount * itemPrice;

					//if the stock quatity is greater than the user resqust,,,
					if (product.stock_quantity >= selectedAmount) {
					 	
					 	//, update the stock in the database
						updateProduct(selectedItem, updateStock);
						// then update the total sale in the database
						getDeptInfo(deptName, totalPurchase);

						console.log("Thank you for shopping with Bamazon! Your total is " + totalPurchase);

						//once that databse is updated, we pulled the response and store it locally again
						getProductLookup();
						
						//show the table
						displayTable();

						return false;
			
			 		}else if (product.stock_quantity < selectedAmount) {
					//if the stock quatity is less than the user resqust,,,
						
						console.log("Due to insufficient quantity, Bamazon cannot complete your order!");
					 	
					 	//show the table
						displayTable();

						return false;
					}
			}else{
			//if the item id is not found,,

				console.log("Product not found. Please try again...");
				
				//show the table again
				displayTable();
				return false;
			}
	});//then

}//startShopping


getProductLookup();
displayTable();





