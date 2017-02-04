# BAMAZON APP

This is a node application using mySQL database that will be run in the command line.  There are different parts to this app.
"bamazon.js" is the for the client, it allows client to see the products and buy it while updating the data base.
"bamazonManager.js" is for the manerger because it allowas the modification of inventory.

### First open the command line and run "npm install"

## How to run bamazonClient.js

* Open command line and run "node bamazon.js" to see all the products.
* Enter the item ID that you want to buy
* Enter the quantity that you wish to buy
* Here is the demo of how it works [click  here](https://youtu.be/8trTBYUrJOI)


##How to run bamazonManager.js

* Open command line and run "node bamazonManager.js" to see the manager options.
* Select "View Products for Sale" to see all the products that is in the database
* Select "View Low Inventory" to see all the products that has the quantity of 5 or less
* Select "Add to Inventory" to update the quantity for the already existing product
* Select "Add New Product" to add the non-existing item
* Here is the demo of how it works [click here](https://youtu.be/p6j5RQHEWrk)

##How to run bamazonSupervisor.js

* Open command line and run "node bamazonSupervisor.js" 
* Select "View Product Sales by Department" to see all the departments that we have
* Select "Create New Department" to add the non-existing department along with its income data
* Here is the demo of how it works [click here](https://youtu.be/0sLruLj_WRs)


