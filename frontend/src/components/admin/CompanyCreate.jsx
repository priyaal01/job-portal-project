import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState()
  const dispatch=useDispatch();

  const registerNewCompany= async()=>{
    try{
      const res = await axios.post(`${COMPANY_API_END_POINT}/create`,{companyName},{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });
      if(res.data.message){
        toast.success(res.data.message)
        dispatch(setSingleCompany(res.data.company))
        console.log(res.data.company)
        const companyId=res?.data?.company?._id
        navigate(`/admin/company/${companyId}`)
      }

    }
    catch(error){
      console.log(error)
      
    }
  }
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto '>
        <div className='my-10'>
          <h1 className='font-bold text-2xl'>Your Company Name</h1>
          <p className='text-slate-500'>what you would like to give your company name. you can change it late if you want.</p>
        </div>
        <Label>Company Name</Label>
        <Input type='text' placeholder='Enter Company Name' className='my-2' onChange={(e)=>setCompanyName(e.target.value)}/>
        <div className='flex items-center gap-3 my-10'>
          <Button variant='outline' onClick={() => navigate(-1)}>Cancel</Button>
          <Button onClick={registerNewCompany}>Continue</Button>

        </div>


      </div>
    </div>
  )
}

export default CompanyCreate