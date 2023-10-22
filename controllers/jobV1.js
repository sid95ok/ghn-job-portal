import jobModel from '../models/job.js';
import applicationHistoryModel from '../models/applicationHistory.js';


export const list = async (request, response, next) => {
    try {
        const { jobId, position, company, city, jobType, skills } = request.query;

        const query = {}

        if (jobId) {
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

        const page = Number(request.query.page) || 1;
        const itemsPerPage = Number(request.query.items) || 10;
        const skipCount = (page - 1) * itemsPerPage;

        var jobs = await jobModel.find(query).sort({ createdAt: -1 }).skip(skipCount).limit(itemsPerPage);

        response.status(200).send({
            success: true,
            message: `Jobs listed successfully.`,
            jobCount: jobs.length,
            pageNumber: page,
            jobs: jobs,
            error: ``
        })
    } catch (error) {
        console.log(`Error while listing jobs.`);
        next(error);
    }
};

export const create = async (request, response, next) => {
    try {
        var { position, company, city, jobType, skills, salary, description } = request.body;

        const job = await jobModel();
        const jobId = job.createJobId();
        if (!description) {
            description = job.createDescription(request.body);
        }

        const newJob = await jobModel.create({
            jobId, position, company, city, jobType, skills, salary, description
        });

        console.log(`Job opening added successfully`);
        response.status(201).send({
            success: true,
            message: `Job opening added successfully.`,
            job: newJob
        });
    } catch (error) {
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

        await applicationHistoryModel.create({ jobId, userId });

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
        const query = { applicationStatus: status, userId: userId }

        var applications = await applicationHistoryModel.find(query)
            .populate({ path: 'jobId', model: 'Job' })
            .sort({ createdAt: -1 }).skip(skipCount).limit(itemsPerPage);

        response.status(200).send({
            success: true,
            message: `Applications listed successfully.`,
            applicationCount: applications.length,
            pageNumber: page,
            applications: applications,
            error: ``
        })

    } catch (error) {
        console.log(`Error while applying for the job opening.`);
        next(error);
    }
};
