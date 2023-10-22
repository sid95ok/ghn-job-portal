import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';

const job = new mongoose.Schema({
    jobId: {
        type: String,
        required: [true, `Job ID cannot be empty`],
        unique: true
    },
    position: {
        type: String,
        required: [true, `Position cannot be empty`]
    },
    company: {
        type: String,
        required: [true, `Company cannot be empty`]
    },
    city: {
        type: String,
        required: [true, `City cannot be empty`]
    },
    jobType: {
        type: String,
        enum: ['Remote', 'Hybrid', 'On-Site'],
        default: 'On-Site'
    },
    skills: {
        type: [String],
        required: [true, `Skills cannot be empty`]
    },
    salary: {
        type: String,
        default: 'NA'
    },
    description: {
        type: String,
        required: [true, `Description cannot be empty`]
    }
},
    {
        timestamps: true
    }
);

job.methods.createJobId = function () {
    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);
    return nanoid();
};

job.methods.createDescription = function () {
    const description = `"${this.position} position at ${this.company}, offering a competitive ${this.salary} salary, located in ${this.city}, with ${jobType} work environment."`
    return description;
};

export default mongoose.model(`Job`, job);
