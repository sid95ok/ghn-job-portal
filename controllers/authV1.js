import userModel from '../models/user.js';


export const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send({
                success: false,
                message: `It looks like you left a required field empty. Please make sure all fields are filled out to continue.`,
                error: `all fields are not provided`
            });
        };

        const user = await userModel.findOne({ email });
        if (!user) {
            return response.status(401).send({
                success: false,
                message: `Sorry, we couldn't find an account associated with this email address. Please double-check your email or sign up if you don't have an account yet.`,
                error: `email provided does not exists`
            });
        };

        const isCorrectPassword = await user.authenticate(password);
        if (!isCorrectPassword) {
            return response.status(401).send({
                success: false,
                message: `It appears that the password you entered is incorrect. Please double-check your password, or you can reset it if needed.`,
                error: `password provided did not match`
            });
        };
        user.password = undefined;
        const token = user.createToken();
        response.status(200).send({
            success: true,
            message: `Login Successfully`,
            user: user,
            token: token
        })

    } catch (error) {
        console.log(`Error while logging in.`);
        next(error);
    }
};

export const signup = async (request, response, next) => {
    try {
        const { name, email, password, city } = request.body;

        if (!name || !email || !password) {
            return response.status(400).send({
                success: false,
                message: `It looks like you left a required field empty. Please make sure all fields are filled out to continue.`,
                error: `all fields are not provided`
            });
        };

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return response.status(409).send({
                success: false,
                message: `It seems that an account with this email address already exists. Please try using a different email or log in if you have an existing account.`,
                error: `email provided already exists`
            });
        };

        const user = await userModel.create({
            name, email, password, city
        });

        const token = user.createToken();

        console.log(`New user signed up successfully`)
        user.password = undefined;
        response.status(201).send({
            success: true,
            message: `Your signup was successful. You can now log in to access your account and explore the exciting job opportunities waiting for you.`,
            user: user,
            error: ``,
            token: token
        });

    } catch (error) {
        console.log(`Error while signing up a new user.`);
        next(error);
    }
};

export const getCurrentUser = async (request, response, next) => {
    try {
        const userId = request.user.userId;
        const currentUser = await userModel.findOne({ _id: userId });
        currentUser.password = undefined;
        response.status(200).send({
            success: true,
            user: currentUser,
            error: ``
        });

    } catch (error) {
        console.log(`Error while signing up a new user.`);
        next(error);
    }
};
