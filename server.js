// Module imports
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import xssClean from 'xss-clean';
import expressMongoSanitize from 'express-mongo-sanitize';

import { databaseConnect } from './config/databaseConnection.js';
import { errorMain } from './middlewares/error.js';

import authRoutesV1 from './routes/authV1.js';
import userRoutesV1 from './routes/userV1.js';
import jobRoutesV1 from './routes/jobV1.js';

// Environment initiation
dotenv.config();

// Database Connection
databaseConnect();

// API Swagger related declarations
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Get Hired Now - Job Portal',
            description: 'This NodeJS web-app is a job portal designed to connect job seekers with diverse career opportunities, making the job search process easy and efficient.'
        },
        servers: [
            {
                url: 'http://localhost:8080'
            },
            {
                url: 'https://ghn-job-portal.onrender.com'
            }
        ]
    },
    apis: [
        './routes/*.js'
    ]
};
const spec = swaggerJsDoc(options);

// REST Object
const app = express();

// Middlewares
app.use(helmet());
app.use(xssClean());
app.use(expressMongoSanitize());
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (request, response) => {
    response.send('<h1>Welcome to Get Hired Now, the only job portal you will ever need.<h1>');
});
app.use('/api/auth/v1', authRoutesV1);
app.use('/api/user/v1', userRoutesV1);
app.use('/api/job/v1', jobRoutesV1);
app.use('/api/api-doc', swaggerUi.serve, swaggerUi.setup(spec));

// Error Middlewares
app.use(errorMain);

// Constants
const port = process.env.PORT;
const mode = process.env.MODE;

// Listen
app.listen(port, () => {
    console.log(`WebApp Server is running in ${mode} mode on port - ${port}`);
});
