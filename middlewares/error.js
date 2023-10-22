import { response } from "express";

export const errorMain = (error, request, response, next) => {
    console.log(`Caught Error - ${error}`);
    var statusCode = 500;
    var errorMessage = `Sorry, we encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.`;

    if (error.name == `ValidationError`) {
        statusCode = 400;
        errorMessage = Object.values(error.errors).map(item => item.message).join(',');
    };

    if (error == `AuthenticationFailed`) {
        statusCode = 404;
        errorMessage = `Authentication Failed. Please try again after logging in`;
    };

    response.status(statusCode).send({
        success: false,
        message: errorMessage,
        error: `${error}`
    });
};
