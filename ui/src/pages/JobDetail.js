import React, { useState, useEffect } from "react";
import Layout from "../components/shared/Layout/Layout";
import { useLocation } from "react-router-dom";
import API from "../services/api";


const JobDetail = () => {
    const [data, setData] = useState([]);
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search);
    const jobId = searchQuery.get('jobId');

    const getJobDetail = async (page) => {
        try {
            const { data } = await API.get(`/job/list?jobId=${jobId}`, {});
            if (data?.success && data?.jobs.length > 0) {
                setData(data?.jobs[0]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getJobDetail();
    });

    const handleApply = async () => {
        try {
            const { data } = await API.get(`/job/apply?jobId=${jobId}`, {});
            if (data?.success) {
                alert(data?.message);
            }
        } catch (error) {
            alert(error.response.data?.message);
            console.log(error);
        }
    }


    return (
        <Layout>
            <div>
                <div className="container mt-4">
                    <h1><span style={{ color: 'grey' }}>Position</span> - <span style={{ color: 'dodgerblue' }}>{data?.position}</span>
                        <hr className="border-top" /></h1>
                    <h2><span style={{ color: 'grey' }}>Location -</span> <span style={{ color: 'skyblue' }}>{data?.city}</span></h2>
                    <p>{`${new Date(data?.createdAt).getDate()}-${new Date(data?.createdAt).getMonth()}-${new Date(data?.createdAt).getFullYear()}`}</p>
                    <br /><br />
                    <span style={{ color: 'grey' }}>
                        <h5>Work Environment - {data?.jobType}</h5>
                        <h5>Salary Compensation ~ {data?.salary}</h5>
                        <h5>Skills Required - {data?.skills?.join(', ')}</h5>
                    </span><br />
                    <hr className="border-top" /><br />
                    <p>{data?.description}</p>
                    <button className="btn btn-success" onClick={handleApply}>Apply</button>
                </div>
            </div>
        </Layout >
    )
}

export default JobDetail
