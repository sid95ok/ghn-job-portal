// Module imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { databaseConnect } from './config/databaseConnection.js';
import { errorMain } from './middlewares/error.js';

import authRoutesV1 from './routes/authV1.js';
import userRoutesV1 from './routes/userV1.js';

// Environment initiation
dotenv.config();

// Database Connection
databaseConnect();

// REST Object
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (request, response) => {
    response.send('<h1>Welcome to Get Hired Now, the only job portal you will ever need.<h1>');
});
app.use('/auth/v1', authRoutesV1);
app.use('/user/v1', userRoutesV1);

// Error Middlewares
app.use(errorMain);

// Constants
const port = process.env.PORT;
const mode = process.env.MODE;

// Listen
app.listen(port, () => {
    console.log(`WebApp Server is running in ${mode} mode on port - ${port}`);
});
