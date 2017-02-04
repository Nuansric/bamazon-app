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
	database: "Bamazon_db"
});


connection.connect(function(err) {
	if (err) throw err;
	// console.log("connected as id " + connection.threadId);
	// console.log("\n");

});

function getProfit(){
	 

	connection.query("SELECT * FROM departments", function(err, res){
		
		var departmentLookup = res;

		
		
		//console.log(departmentLookup);

		 for (var i=0; i<departmentLookup.length; i++){

		departmentLookup[i].total_profit = parseFloat(departmentLookup[i].total_sales) - parseFloat(departmentLookup[i].over_head_costs);
	
		}
	
		console.table(departmentLookup);
		});

				delayTimer = setTimeout(supervisorOptions, 1*1000);


}




function newDept(){

	inquirer.prompt([{

		name: "departmentName",
		type: "input",
		message: "What is the new department name?"
		, validate: function(value) {
		  if ((value) === '') {
		    return false;
		  }
		  return true;
		}
	},{

		name: "overHead",
		type: "input",
		message: "What is the department over-head cost??"
		, validate: function(value) {
		  if (isNaN(value) === false) {
		    return true;
		  }
		  return false;
		}
	},{
		name: "saleTotal",
		type: "input",
		message: "How much does the new department sale so far?"
		, validate: function(value) {
		  if (isNaN(value) === false) {
		    return true;
		  }
		  return false;
		}
	}]).then(function(answer){

connection.query("INSERT INTO departments SET ?", [{department_name: answer.departmentName, over_head_costs: answer.overHead, total_sales: answer.saleTotal}], function(err, res){

			console.log("New Department added!!");
});

		delayTimer = setTimeout(supervisorOptions, 1*1000);
	});
			


}
function supervisorOptions(){


	clearTimeout(delayTimer);

	inquirer.prompt([{

		name: "option",
		type: "list",
		message: "What would you like to do?",
		choices: ["View Product Sales by Department", "Create New Department"]
		
	
	}]).then(function(answer){
		if(answer.option === "View Product Sales by Department"){

			getProfit();


		}else if(answer.option === "Create New Department"){

			newDept();
		}
	

});
}

supervisorOptions();

