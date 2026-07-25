import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import AdminApplicationTabel from './AdminApplicationTabel'
import { useNavigate } from 'react-router-dom'
import Footer from '../shared/Footer'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSerchCompanyByText } from '@/redux/companySlice'

const companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();
    const [input, setInput] = useState("")
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(setSerchCompanyByText(input));

    },[input,dispatch])
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between'>
                    <Input type='text' className='w-fit' placeholder='Filter by Name' onChange={(e)=>setInput(e.target.value)}/>
                    <Button onClick={() => navigate("/admin/companies/create")}>Create Company</Button>
                </div>
                <AdminApplicationTabel />
            </div>
            <Footer/>
        </div>
    )
}

export default companies