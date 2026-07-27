import { setAllAdminJob } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/admin/job`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAdminJob(res.data.jobs))
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchAdminJobs();
    }, [])

}

export default useGetAdminJobs