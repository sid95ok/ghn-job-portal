// Module imports
import express from 'express';
import dotenv from 'dotenv';
import databaseConnect from './config/databaseConnection.js';

//Environment initiation
dotenv.config();

// Database Connection
databaseConnect();

//REST Object
const app = express();

//Routes
app.get('/', (request, response) => {
    response.send("<h1>Welcome to Get Hired Now, the only job portal you will ever need.<h1>");
});

//Constants
const port = process.env.PORT;
const mode = process.env.MODE;

//Listen
app.listen(port, () => {
    console.log(`WebApp Server is running in ${mode} mode on port - ${port}`);
});
