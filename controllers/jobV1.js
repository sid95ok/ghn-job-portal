import jobModel from '../models/job.js';
import applicationHistoryModel from '../models/applicationHistory.js';


class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

export const list = async (request, response, next) => {
    try {
        const { jobId, position, company, city, jobType, skills } = request.query;
        const userId = request.user.userId;
        var query = { userId: { $ne: userId } };

        if (jobId) {
            query = {}
            query.jobId = jobId;
        };
        if (position) {
            query.position = { $in: position.split(',') };
        };
        if (company) {
            query.company = { $in: company.split(',') };
        };
        if (city) {
            query.city = { $in: city.split(',') };
        };
        if (jobType) {
            query.jobType = { $in: jobType.split(',') };
        };
        if (skills) {
            query.skills = { $in: skills.split(',') };
        };


        var jobs = await jobModel.find(query);
        const page = Number(request.query.page) || 1;
        const itemsPerPage = Number(request.query.items) || 10;
        const skipCount = (page - 1) * itemsPerPage;
        var filteredJobs = await jobModel.find(query).sort({ createdAt: -1 }).skip(skipCount).limit(itemsPerPage);

        var totalPages = Math.ceil(jobs.length / itemsPerPage);

        response.status(200).send({
            success: true,
            message: `Jobs listed successfully.`,
            jobCount: filteredJobs.length,
            totalJobCount: jobs.length,
            totalPages: totalPages,
            pageNumber: page,
            jobs: filteredJobs,
            error: ``
        })
    } catch (error) {
        console.log(`Error while listing jobs.`);
        next(error);
    }
};

export const create = async (request, response, next) => {
    try {
        var { position, company, city, jobType, skills, salary, yearsOfExp, description } = request.body;

        const userId = request.user.userId;

        const job = await jobModel();
        const jobId = job.createJobId();
        if (!description) {
            description = job.createDescription(request.body);
        }
        if (!skills) {
            throw new ValidationError();
        }
        if (!salary) {
            salary = "Not Disclosed"
        }

        const newJob = await jobModel.create({
            jobId, position, company, city, jobType, skills, salary, yearsOfExp, description, userId
        });

        console.log(`Job opening added successfully`);
        response.status(201).send({
            success: true,
            message: `Job opening added successfully.`,
            job: newJob
        });
    } catch (error) {
        if (error.name == `ValidationError`) {
            response.status(400).send({
                success: false,
                message: `It looks like you left a required field empty or in wrong format. Please make sure all fields are filled out to continue.`
            });
        }
        console.log(`Error while creating job opening.`);
        next(error);
    }
};

export const apply = async (request, response, next) => {
    try {
        var { jobId } = request.query;

        if (!jobId) {
            return response.status(400).send({
                success: false,
                message: `It looks like you left a required field empty. Please make sure all fields are filled out to continue.`,
                error: `all fields are not provided`
            });
        }

        const job = await jobModel.findOne({ jobId });
        jobId = job._id;
        const userId = request.user.userId;

        await applicationHistoryModel.create({ jobId: jobId, userId: userId });

        console.log(`Applied for the Job opening successfully`);
        response.status(201).send({
            success: true,
            message: `Applied for the Job opening successfully.`
        });
    } catch (error) {
        console.log(error)
        if (error.code == 11000) {
            response.status(409).send({
                success: false,
                message: `You have already applied for this Job opening.`
            });
        } else {
            console.log(`Error while applying for the job opening.`);
            next(error);
        }
    }
};

export const listApplications = async (request, response, next) => {
    try {
        var { status } = request.query;

        const page = Number(request.query.page) || 1;
        const itemsPerPage = Number(request.query.items) || 10;
        const skipCount = (page - 1) * itemsPerPage;

        const userId = request.user.userId;
        const query = { userId: userId }
        if (status) {
            query.applicationStatus = status
        }

        var applications = await applicationHistoryModel.find(query)
            .populate({ path: 'jobId', model: 'Job' })
            .sort({ createdAt: -1 })

        var filteredApplications = await applicationHistoryModel.find(query)
            .populate({ path: 'jobId', model: 'Job' })
            .sort({ createdAt: -1 }).skip(skipCount).limit(itemsPerPage);

        var totalPages = Math.ceil(applications.length / itemsPerPage);

        response.status(200).send({
            success: true,
            message: `Applications listed successfully.`,
            applicationCount: filteredApplications.length,
            totalJobCount: applications.length,
            totalPages: totalPages,
            pageNumber: page,
            applications: applications,
            error: ``
        })

    } catch (error) {
        console.log(`Error while applying for the job opening.`);
        next(error);
    }
};


export const listPosted = async (request, response, next) => {
    try {
        const { jobId, position, company, city, jobType, skills } = request.query;
        const userId = request.user.userId;
        const query = { userId: userId };

        var jobs = await jobModel.find(query);
        const page = Number(request.query.page) || 1;
        const itemsPerPage = Number(request.query.items) || 10;
        const skipCount = (page - 1) * itemsPerPage;
        var filteredJobs = await jobModel.find(query).sort({ createdAt: -1 }).skip(skipCount).limit(itemsPerPage);

        var totalPages = Math.ceil(jobs.length / itemsPerPage);

        response.status(200).send({
            success: true,
            message: `Jobs listed successfully.`,
            jobCount: filteredJobs.length,
            totalJobCount: jobs.length,
            totalPages: totalPages,
            pageNumber: page,
            jobs: filteredJobs,
            error: ``
        })
    } catch (error) {
        console.log(`Error while listing jobs.`);
        next(error);
    }
};
