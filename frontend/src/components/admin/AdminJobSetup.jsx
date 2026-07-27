import React, { useState } from "react";
import axios from "axios";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";



const AdminJobs = () => {
    useGetAllCompanies();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        location: "",
        salary: "",
        position: "",
        jobtype: "",
        companyId: "",
    });
    const { loading } = useSelector(store => store.auth)
    const { allCompany } = useSelector(store => store.company)
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const selectChangeHandler = (name, value) => {
        setInput(prev => ({ ...prev, [name]: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${JOB_API_END_POINT}/createjob`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                    <h1 className="text-xl font-bold text-slate-900 mb-1">Post a New Job</h1>
                    <p className="text-sm text-slate-500 mb-6">
                        Fill in the details below to publish a new job listing.
                    </p>

                    <form onSubmit={submitHandler} className="space-y-5">
                        <div>
                            <Label>Job Title</Label>
                            <Input
                                name="title"
                                value={input.title}
                                onChange={changeHandler}
                                placeholder="e.g. MERN Stack Developer"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Textarea
                                name="description"
                                value={input.description}
                                onChange={changeHandler}
                                placeholder="Describe the role and responsibilities"
                                className="mt-1 min-h-[100px]"
                            />
                        </div>

                        <div>
                            <Label>Requirements</Label>
                            <Textarea
                                name="requirements"
                                value={input.requirements}
                                onChange={changeHandler}
                                placeholder="Comma separated, e.g. React, Node.js, MongoDB"
                                className="mt-1"
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <Label>Location</Label>
                                <Input
                                    name="location"
                                    value={input.location}
                                    onChange={changeHandler}
                                    placeholder="e.g. Pune, Maharashtra"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label>Salary</Label>
                                <Input
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeHandler}
                                    placeholder="e.g. 4.2L - 6L /yr"
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <Label>Position</Label>
                                <Input
                                    name="position"
                                    value={input.position}
                                    onChange={changeHandler}
                                    placeholder="e.g. 2 openings"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label>Job Type</Label>
                                <Select onValueChange={(value) => selectChangeHandler("jobtype", value)}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select job type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Full-time">Full-time</SelectItem>
                                        <SelectItem value="Part-time">Part-time</SelectItem>
                                        <SelectItem value="Internship">Internship</SelectItem>
                                        <SelectItem value="Contract">Contract</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <Label>Company</Label>
                            <Select value={input.companyId} onValueChange={(value) => selectChangeHandler("companyId", value)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select a company" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        allCompany.length <= 0 ? <SelectItem value="no_company" disabled>No Company is Registered</SelectItem> : (
                                            allCompany.map((company) => (
                                                <SelectItem key={company._id} value={company._id} >{company?.name}</SelectItem>
                                            ))
                                        )
                                    }
                                </SelectContent>
                            </Select>
                        </div>

                        {
                            loading ? <Button className='mt-3 w-full'><Loader2 className=' mr-2 w-4 h-4 animate-spin' /> Please Wait</Button> : <Button className='mt-3 w-full'>Create Job</Button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminJobs;