import jobModel from '../models/job.js';


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
        const { position, company, city, jobType, skills, salary, description } = request.body;

        const job = await jobModel();
        const jobId = job.createJobId();
        if (!description) {
            description = job.createDescription();
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
