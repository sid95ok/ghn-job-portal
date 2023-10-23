import React, { useState } from 'react';
import API from '../services/api';
import Layout from "../components/shared/Layout/Layout";

const PostJob = () => {

    const [position, setPosition] = useState("");
    const [company, setCompany] = useState("");
    const [city, setCity] = useState("");
    const [jobType, setJobType] = useState("");
    const [skills, setSkills] = useState("");
    const [salary, setSalary] = useState("");
    const [yearsOfExp, setYearsOfExp] = useState("");
    const [description, setDescription] = useState("");

    const handlePostJob = async (e, position, company, city, jobType, skills, salary, yearsOfExp, description) => {
        e.preventDefault();
        try {
            const data = await API.post(`/job/create`, { position, company, city, jobType, skills, salary, yearsOfExp, description });
            if (data?.data.message) {
                alert(data.data.message);
            }
            window.location.replace("/postJob");
        } catch (error) {
            alert(error.response.data.message);
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card custom-card">
                            <div className="card-header">
                                Post a Job requirement
                            </div>
                            <div className="card-body">
                                <form onSubmit={(e) => { return handlePostJob(e, position, company, city, jobType, skills, salary, yearsOfExp, description); }}>
                                    <div className="mb-3">
                                        <label htmlFor="position" className="form-label">Position</label>
                                        <input type="text" className="form-control" name="position" placeholder="e.g - Backend Developer" value={position} onChange={(e) => setPosition(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="company" className="form-label">Company Name</label>
                                        <input type="text" className="form-control" name="company" placeholder="e.g - Beekin Technologies" value={company} onChange={(e) => setCompany(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="yearsOfExp" className="form-label">Year of Experience</label>
                                        <input type="text" className="form-control" name="yearsOfExp" placeholder="Try to provide a range (e.g - 4-7 years)" value={yearsOfExp} onChange={(e) => setYearsOfExp(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="city" className="form-label">Location (City)</label>
                                        <input type="text" className="form-control" name="city" placeholder="Bengaluru, Karnataka" value={city} onChange={(e) => setCity(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="jobType" className="form-label">Job Type (Choose one)</label>
                                        <input type="text" className="form-control" name="jobType" placeholder="Hybrid / On-site / Remote" value={jobType} onChange={(e) => setJobType(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="skills" className="form-label">Skills Required</label>
                                        <input type="text" className="form-control" name="skills" placeholder="Add comma separated values - Python, AWS, Docker" value={skills} onChange={(e) => setSkills(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="salary" className="form-label">Salary (approx)</label>
                                        <input type="text" className="form-control" name="salary" placeholder="Provide annual CTC with currency. e.g - $ 50000" value={salary} onChange={(e) => setSalary(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description (Optional)</label>
                                        <textarea rows={5} className="form-control" name="description" placeholder="It is optional but try to write 100-200 words for better reach" value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    <div className="col-md-6">
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PostJob
