import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const user = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `Name cannot be empty`]
    },
    email: {
        type: String,
        required: [true, `Email cannot be empty`],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, `Password cannot be empty`],
        minlength: [8, `Your password must be at least 8 characters long. Please choose a stronger password to ensure the security of your account`]
    },
    city: {
        type: String
    }
},
    {
        timestamps: true
    }
);

user.pre('save', async function () {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

// JWT
user.methods.createToken = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Authenticate Password
user.methods.authenticate = async function (password) {
    const isCorrectPassword = await bcryptjs.compare(password, this.password);
    return isCorrectPassword;
};

export default mongoose.model(`User`, user);
