import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantJobTable from './ApplicantJobTable'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '@/redux/applicationSlice'
import { toast } from 'sonner'

const Applicants = () => {
    const params = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllApplicant = async (e) => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/applicants/${params.id}`, { withCredentials: true });
                console.log(res.data)
                if(res.data.success){
                    toast.success(res.data.message)
                    dispatch(setApplicants(res.data.job))
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchAllApplicant();
    },[])
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto mt-10'>
                <ApplicantJobTable />

            </div>
        </div>
    )
}

export default Applicants