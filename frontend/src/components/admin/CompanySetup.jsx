import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBigLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { toast } from 'sonner';
import useGetCompanyByid from '@/hooks/useGetCompanyByid';

const CompanySetup = () => {
    const navigate = useNavigate();
    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const params = useParams();
    const {singleCompany}= useSelector(store=>store.company)
    useGetCompanyByid(params.id);
    

    const [input, setInput] = useState({
        name: "",
        location: "",
        website: "",
        description: "",
        file: null
    })

    const changeEventHnadler = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const changeFileEventHandler = (e) => {
        const file = e.target?.files?.[0];
        setInput(prev => ({ ...prev, file }))
    }

    useEffect(() => {
        setInput({
            name: singleCompany?.name|| "",
            location:singleCompany?.location|| "",
            website:singleCompany?.website ||"",
            description:singleCompany?.description  ||  "",
            logo: singleCompany?.logo|| null
        })
    }, [singleCompany])

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name)
        formData.append("location", input.location)
        formData.append("website", input.website)
        formData.append("description", input.description)
        if (input.file) {
            formData.append("logo", input.file)
        }
        try {
            dispatch(setLoading(true))
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/company")
            }
        }
        catch (error) {
            console.log(error.response?.data)
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-2xl mx-auto mt-10 '>
                <form onSubmit={submitHandler}>
                    <div className='shadow-xl p-4 rounded-lg'>
                        <div className='flex items-center gap-32 mb-5'>
                            <Button variant='outline' onClick={() => navigate('/admin/company')}><ArrowBigLeft size={10} /> Back</Button>
                            <h1 className='text-xl font-bold'>Company Setup</h1>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <Label>Company Name</Label>
                                <Input type='text' name='name' value={input.name} onChange={changeEventHnadler} className='my-2 ' />
                            </div>
                            <div>
                                <Label>Location</Label>
                                <Input type='text' className='my-2 ' name='location' value={input.location} onChange={changeEventHnadler} />
                            </div>
                            <div>
                                <Label>Website</Label>
                                <Input type='text' className='my-2 ' name='website' value={input.website} onChange={changeEventHnadler} />
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Input type='text' className='my-2 ' name='description' value={input.description} onChange={changeEventHnadler} />
                            </div>
                            <div>
                                <Label>Logo</Label>
                                <Input type='file' className='my-2 ' accept="image/*" onChange={changeFileEventHandler} />
                            </div>
                        </div>
                        {
                            loading ? <Button type='submit' className='mt-2 w-full'><Loader2 className=' mr-2 w-4 h-4 animate-spin' /> Please Wait</Button> : <Button className='w-full mt-2'>Update</Button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup