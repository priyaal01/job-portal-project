import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    MapPin,
    IndianRupee,
    Briefcase,
    Clock,
    Building2,
    CheckCircle2,
} from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useState } from "react";

const JobDetails = () => {
    const params = useParams();
    const jobId = params.id;
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const initialIsApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(initialIsApplied)
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, null, { withCredentials: true });
            if (res.data.success) {
                const updateSingleJob = {
                    ...singleJob,
                    applications: [...(singleJob?.applications || []), { applicant: user?._id }]
                }
                setIsApplied(true);
                dispatch(setSingleJob(updateSingleJob))
                toast.success(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "something went wrong");
        }
    }


    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/job/${jobId}`, { withCredentials: true });
                console.log(res.data.job.applications)
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.Jon.applications.some(application => application.applicant === user?._id))
                }
            }
            catch (err) {
                console.log(err);
            }
        }

        if (!jobId) return;
        fetchSingleJob();
    }, [jobId, dispatch, user?._id])




    function getDaysAgo(postDate) {
        const now = new Date();
        const past = new Date(postDate);
        const diffTime = Math.abs(now - past);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        return `${diffDays} days ago`;
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">{singleJob?.title}</h1>
                            <p className="flex items-center gap-1.5 text-slate-600 mt-1">
                                <Building2 size={15} /> {singleJob?.company?.name || singleJob?.company}
                            </p>
                        </div>
                    </div>

                    {/* Quick info */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 mt-5">
                        <span className="flex items-center gap-1.5">
                            <MapPin size={15} /> {singleJob?.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <IndianRupee size={15} /> {singleJob?.salary}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Briefcase size={15} /> {singleJob?.jobtype}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={15} /> {singleJob?.experience}
                        </span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mt-5">
                        {singleJob?.skills?.map((skill) => (
                            <Badge key={skill} variant="secondary">
                                {skill}
                            </Badge>
                        ))}
                    </div>

                    <hr className="my-6 border-slate-200" />

                    {/* Description */}
                    <div>
                        <h2 className="text-base font-semibold text-slate-900 mb-2">
                            Job Description
                        </h2>
                        <p className="text-slate-600 leading-relaxed">{singleJob?.description}</p>
                    </div>

                    {/* Requirements */}
                    <div className="mt-6">
                        <h2 className="text-base font-semibold text-slate-900 mb-2">
                            Requirements
                        </h2>
                        <ul className="space-y-2">
                            {singleJob?.requirements?.map((req, i) => (
                                <li key={i} className="flex items-start gap-2 text-slate-600">
                                    <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" />
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <hr className="my-6 border-slate-200" />

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <span className="text-xs text-slate-700">Posted {getDaysAgo(singleJob?.createdAt.split("T")[0])}</span>
                            <span className="text-xs text-slate-700">{singleJob?.applications.length} Applicants </span>


                        </div>

                        {
                            isApplied ? <Button className='text-white cursor-not-allowed bg-green-500 hover:bg-green-400'>Already Applied</Button> : <Button
                                onClick={isApplied ? null : applyJobHandler}
                                className="bg-green-600 hover:bg-green-700">Apply Now</Button>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;