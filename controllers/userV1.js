import userModel from '../models/user.js';


export const update = async (request, response, next) => {
    try {
        const { name, email, password, city } = request.body;

        if (!name || !email || !city) {
            return response.status(400).send({
                success: false,
                message: `It looks like you left a required field empty. Please make sure all fields are filled out to continue.`,
                error: `all fields are not provided`
            });
        };

        const user = await userModel.findOne({ _id: request.user.userId });
        user.name = name;
        user.email = email;
        user.city = city;

        if (password) {
            user.password = password;
        };

        const updatedUser = await user.save();
        const token = user.createToken();

        console.log(`User details updated successfully`)
        user.password = undefined;
        response.status(200).send({
            success: true,
            message: `Your details were updated successfully.`,
            user: updatedUser,
            error: ``,
            token: token
        });

    } catch (error) {
        console.log(`Error while updating user.`);
        next(error);
    }
};
