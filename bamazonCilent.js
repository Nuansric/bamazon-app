//======Dependencies======
var mysql = require("mysql");
var inquirer = require("inquirer");
var importedPassword = require("./key.js");
var table =  require("console.table");


//Global variables
var delayTimer;
var productLookup ={
	products : null
};

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	port: 3306,
	password: importedPassword.mySQLKeys.password,
	database: "bamazon_db"
});


connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);

});


function getProductLookup(){

	connection.query("SELECT * FROM products", function(err, res){
		productLookup.products = res;
	});

}


function findProductByID(itemID){

  for(var x = 0; x < productLookup.products.length; x ++){
  	if(productLookup.products[x].item_id == itemID){

  		return productLookup.products[x];
  	}
  }
}
function getDeptInfo(deptName, totalPurchase){
		connection.query("SELECT * FROM departments WHERE ?",[{department_name: deptName}], function(err, res){

				var totalSale = res[0].total_sales;
								//console.log(totalSale);

				var newSale = totalPurchase + totalSale;

								//console.log(newSale);
								
				updateDepartment(deptName, newSale);
		});
}
function updateProduct(itemID, updatedQuantity){

connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updatedQuantity}, {item_id: itemID }], function(err, res){

});

}

function findDepartment(departmentName){
	// connection.query("SELECT * FROM departments WHERE?",[{department_name: departmentName}], function(err, res){

	// 	return res.total_sales;

	// });
}

function updateDepartment(departmentName, updatedSale){

connection.query("UPDATE departments SET ? WHERE ?", [{total_sales: updatedSale}, {department_name: departmentName }], function(err, res){

});

}



function displayTable(){
connection.query("SELECT * FROM products", function(err, res){
	if(err) throw err;

	console.table(res);

	delayTimer = setTimeout(clearDelay, 1 * 1000);

})//database

// Function to control the display of the next question
		function clearDelay(){

			//clear the 5 seconds timeout
			clearTimeout(delayTimer);

			//call startTime to display the next question and starting the timer
			startShopping();

		} // clearDelay function


} //displayTable

function startShopping(){

	inquirer.prompt([{

		name: "itemID",
		type: "input",
		message: "What is the ID of the item you wish to buy?"
		, validate: function(value) {
		  if (isNaN(value) === false) {
		    return true;
		  }
		  return false;
		}
	},{

		name: "amount",
		type: "input",
		message: "What is the quantity you wish to buy?"
		, validate: function(value) {
		  if (isNaN(value) === false) {
		    return true;
		  }
		  return false;
		}
	}]).then(function(answer){

				
			var selectedItem = parseInt(answer.itemID);
			var product = findProductByID(selectedItem);

			if(product != null && product != undefined){

				var initialStock = product.stock_quantity;
				var selectedAmount = parseInt(answer.amount);
				var updateStock = initialStock - selectedAmount;
				var itemPrice = product.price;
				var deptName = product.department_name;
				var totalPurchase = selectedAmount * itemPrice;

				
				


					if (product.stock_quantity >= selectedAmount) {
					 
						updateProduct(selectedItem, updateStock);
						getDeptInfo(deptName, totalPurchase);
							// connection.query("SELECT * FROM departments WHERE ?",[{department_name: deptName}], function(err, res){

							// 	var totalSale = res[0].total_sales;
							// 	//console.log(totalSale);

							// 	var newSale = totalPurchase + totalSale;

							// 	//console.log(newSale);
								
							// 	updateDepartment(deptName, newSale);
							// });


						console.log("Thank you for shopping with Bamazon! Your total is " + totalPurchase);

						getProductLookup();
						
						displayTable();

						 return false;
			
			 		}else if (product.stock_quantity < selectedAmount) {

						console.log("Due to insufficient quantity, Bamazon cannot complete your order!");
					 
						displayTable();

						return false;
					}
			}else{
				console.log("Product not found. Please try again...");
				displayTable();
				return false;
			}
	})//then

}//startShopping


getProductLookup();
displayTable();





