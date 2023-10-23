import mongoose from 'mongoose';
import ShortUniqueId from 'short-unique-id';

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
        default: 'Not Available'
    },
    yearsOfExp: {
        type: String,
        required: [true, `Years of experience cannot be empty`]
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
    const { randomUUID } = new ShortUniqueId({ length: 10 });
    return randomUUID();
};

job.methods.createDescription = function (requestBody) {
    var { position, company, city, jobType, skills, salary, description } = requestBody;
    description = `${position} position at ${company}, offering a competitive ${salary} salary, located in ${city}, with ${jobType} work environment.`
    return description;
};

export default mongoose.model(`Job`, job);
