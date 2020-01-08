# Product Inventory

The product inventory is a single page application that lets you add new products to the database. Additional features include searching alphabetically and updating or deleting a product from the table. 

## Sotware used
| Front End | Back End | Database | Runtime Env|
|-----------|----------|----------|------------|
| React JS  | Express  | MongoDB  |   Node.js  |



## How to run this app
1. Either fork or download the app and open the folder in the cli.
1. Install all dependencies using `npm i` command.
1. cd to backend folder. Start the webserver using the `npm start`. This starts the node app.
1. Open a new terminal and cs to frontend folder. Run the `npm start` command. This starts node-sass. 1. If the project does not open on its own, go to [http://localhost:3000](http://localhost:3000).

## How to create a new product
1. In the form provided on the product inventory page, enter the product name, category, price and in stock information. 
1. Hit save. The product should be stored in the database and should e visible in the My Inventory table.

## How to update a product information
1. Hit the update button on the product row that needs to be updated. 
1. The product information is automatically filled in the form below the table.
1. Make any required changes.
1. Hit update button below the form. The product should show the updated values in the table.

## How to delete a product from the database
1. To delete a product, hit the delete button on the product row. 
1. Product should vanish from the table and the entry should be deleted from the database.

## User stories
- Create a new entry for a product in the database.
- Display the database entries on a table.
- Include a form to enter new product information.
- Ability to update a product entry in the database.
- Ability to delete a product entry from the database.

## Features
- **Create a product**
    - Form to create a new product into the database

- **Display inventory**
    - Display all the product entries in a tabular form on the webpage.

- **Update product**
    - Update a product information in the database

- **Delete product**
    - Delete a product in the database

## Project Screenshot

![Shreenshot](https://github.com/shrutikhandekar1/ProductInventoryApp/blob/master/ProductImage.png)