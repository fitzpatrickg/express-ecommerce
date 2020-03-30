## Faker
The faker file contains the code that runs using the `npm run seed` and `npm run dump` commands in the terminal. `npm run seed` populates the products collection with as many products as you need. The fake data is built using faker.js. A category collection is also populated based on their third bullet point, which is generated using a different function than the others making it unique. The `npm run dump` command empties these collections.



#### TODO
- add terminal command options to define number of products to populate database
- add jwt authentication for users
- add get product by category route
- change product to contain category id instead of category name