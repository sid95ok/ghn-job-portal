import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/api";
import { Link } from "react-router-dom";

const Application = () => {

    const [data, setData] = useState([]);
    const [pages, setPage] = useState([]);
    const [totalPages, setTotalPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalJobCount, setJobs] = useState(0);

    const getJobList = async (page) => {
        try {
            if (!page) { page = 1 }
            const { data } = await API.get(`/job/listApplications?items=10&page=${page}`, {});
            if (data?.success) {
                console.log(data);
                setData(data?.applications);
                setJobs(data?.totalJobCount);
                setTotalPages(data?.totalPages);
                const range = Array.from({ length: data?.totalPages }, (_, index) => 1 + index);
                setPage(range)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePagination = async (page) => {
        try {
            setCurrentPage(page);
            getJobList(page);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePrevious = async () => {
        if (currentPage > 1) {
            handlePagination(Number(currentPage) - 1)
        }
    }
    const handleNext = async () => {
        if (currentPage < totalPages) {
            handlePagination(Number(currentPage) + 1)
        }
    }

    useEffect(() => {
        getJobList();
    }, []);

    return (
        <Layout>
            <div>
                <div className="container mt-4">
                    <h1>Your Applied Job Applications - {totalJobCount}</h1><hr className="border-top" />

                    {data?.map((record) => (
                        <div key={record._id}>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title"><Link to={`/jobDetail?jobId=${record.jobId.jobId}`}>{record.jobId.position}</Link> - <span style={{ color: 'green' }}>{record.applicationStatus} ({`${new Date(record.updatedAt).getDate()}-${new Date(record.updatedAt).getMonth()}-${new Date(record.updatedAt).getFullYear()}`})</span></h5>
                                    <h6 className="card-title">{record.jobId.company} - {record.jobId.city} ({record.jobId.jobType})</h6>
                                    <p style={{ color: 'grey' }} className="card-text">Compensation - {record.jobId.salary}</p>
                                </div>
                                <hr className="border-top" />
                            </div>
                            <></>
                        </div>
                    ))}

                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <button className="page-link" href="#" tabIndex={-1} aria-disabled="true" onClick={handlePrevious}>Previous</button>
                            </li>
                            {pages?.map((record) => (
                                <div key={record}>
                                    <li className="page-item"><button className="page-link" onClick={() => handlePagination(record)}>{record}</button></li>
                                </div>
                            ))}
                            <li className="page-item">
                                <button className="page-link" onClick={handleNext}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </Layout >

    );
};

export default Application;
