var mysql = require('mysql');
var cTable = require('console.table');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon'
});

connection.connect();

console.log("database connected");

connection.query('SELECT item_id, product_name, department_name, price, stock_quantity FROM products', function (error, results, fields) {
    if (error) {
        throw error;
    }

    console.table(results);

    inquirer
        .prompt([
            {
                name: "productIdToBuy",
                message: "Please enter the ID of the product you would like to buy."
            }
        ])
        .then(answers => {
            const productIdToBuy = answers.productIdToBuy;

            console.log(productIdToBuy);

            inquirer
                .prompt([
                    {
                        name: "unitsToBuy",
                        message: "Please enter how many units of the product you would like to buy."
                    }
                ])
                .then((answers) => {
                    console.log(answers.unitsToBuy);
                    
                    for(var index = 0; index < results.length; index++) {
                        const result = results[index];

                        if (result.item_id == productIdToBuy) {
                            if (result.stock_quantity >= answers.unitsToBuy) {
                                const remainingValue = result.stock_quantity - answers.unitsToBuy;

                                connection.query('UPDATE products SET stock_quantity = ' + remainingValue + ' WHERE item_id = ' + productIdToBuy, 
                                function (error, results, fields) {
                                    if (error) {
                                        throw error;
                                    }

                                    const totalPrice = result.price * answers.unitsToBuy;
                                    console.log(totalPrice);
                                });
                            } else {
                                console.log("Insufficient quantity!");
                            }
                        }
                    }
                })
        });
});


  