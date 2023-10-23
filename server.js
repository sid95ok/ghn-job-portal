// Module imports
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import xssClean from 'xss-clean';
import expressMongoSanitize from 'express-mongo-sanitize';
import path from 'path';
import * as url from 'url';

import { databaseConnect } from './config/databaseConnection.js';
import { errorMain } from './middlewares/error.js';

import authRoutesV1 from './routes/authV1.js';
import userRoutesV1 from './routes/userV1.js';
import jobRoutesV1 from './routes/jobV1.js';

// Environment initiation
dotenv.config();

// Database Connection
databaseConnect();

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

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
app.use('/api/v1/auth', authRoutesV1);
app.use('/api/v1/user', userRoutesV1);
app.use('/api/v1/job', jobRoutesV1);
app.use('/api/api-doc', swaggerUi.serve, swaggerUi.setup(spec));

// Error Middlewares
app.use(errorMain);

// UI
app.use(express.static(path.join(__dirname, '/ui/build')));
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '/ui/build/index.html'));
});

// Constants
const port = process.env.PORT;
const mode = process.env.MODE;

// Listen
app.listen(port, () => {
    console.log(`WebApp Server is running in ${mode} mode on port - ${port}`);
});
