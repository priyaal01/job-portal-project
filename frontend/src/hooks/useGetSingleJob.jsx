import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetSingleJob = (jobId) => {
    const dispatch = useDispatch()
    useEffJect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/job/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs))
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchSingleJob();
    }, [])

}

export default useGetSingleJob