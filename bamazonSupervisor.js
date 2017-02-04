//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var importedPassword = require("./key.js");
var table =  require("console.table");

//gloabal variable for timer
var delayTimer;

//mySQL
var connection = mysql.createConnection({
	host: "localhost",
	//port: 3306,
	user: "root",
	password: importedPassword.mySQLKeys.password,
	database: "Bamazon_db"
});

//test connection
connection.connect(function(err) {
	if (err) throw err;


});

//
function getProfit(){
	 
	connection.query("SELECT * FROM departments", function(err, res){
		
		//storing response in a local variable
		var departmentLookup = res;

			for (var i=0; i<departmentLookup.length; i++){
				//calculate the total profit and adding it into each object in the array as a new property
				departmentLookup[i].total_profit = parseFloat(departmentLookup[i].total_sales) - parseFloat(departmentLookup[i].over_head_costs);	
			}
			//display newly added table
			console.table(departmentLookup);
		});
			//call supervisor questions after 1 second
			delayTimer = setTimeout(supervisorOptions, 1*1000);
}

//adding new department questions
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

			//insert new row into the table where data is from user input
			connection.query("INSERT INTO departments SET ?", [{department_name: answer.departmentName, over_head_costs: answer.overHead, total_sales: answer.saleTotal}], function(err, res){

				console.log("New Department added!!");
			});

		//call supervisor questions after 1 second
		delayTimer = setTimeout(supervisorOptions, 1*1000);
	});
			
}

//question set for supervisor to pick
function supervisorOptions(){
	//clear Timer
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

