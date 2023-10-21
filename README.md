# Radiant

[Live Website](https://radiant.surge.sh/)

### Introduction

This project is a server-side application built using Node.js and Express.js, which serves as the backend for a web application dealing with product management, brand management, and user management. The server utilizes a MongoDB database for data storage and retrieval. It provides various APIs for performing CRUD operations on products, brands, types, and users.

### Technologies Used

- Node.js
- Express.js
- MongoDB
- Cors

### Key Features

- APIs for CRUD operations on products, brands, types, and users
- Routes for retrieving, adding, updating, and deleting data entries
- Integration with MongoDB for database management
- Use of environment variables for configuration
- Error handling for server-side operations
- Middleware implementation for parsing JSON and handling cross-origin resource sharing (CORS)

### APIs and Operations

- Product APIs: Get all products, get a single product, add a product, update a product, and delete a product
- Brand APIs: Get all brands, add a brand, update a brand, and get a single brand
- Type APIs: Get all types and add a type
- User APIs: Get all users, get a single user, add a user, and update a user's cart items

### Setup and Execution

- The project can be set up by installing the required dependencies, configuring the environment variables, and connecting to the MongoDB database.
- The application is initiated using the `app.listen` method, which starts the server on a defined port.
- Each API endpoint is defined with specific routes, and corresponding database operations are performed.

### Error Handling

- The server implements error handling using try-catch blocks, which capture and log any errors that occur during database operations.

### Conclusion

This project serves as a robust backend system for managing products, brands, types, and users, providing a secure and efficient way to perform various CRUD operations and maintain a well-structured database for a web application.
