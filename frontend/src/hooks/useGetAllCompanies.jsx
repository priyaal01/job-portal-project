import { setAllCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllJob = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/getcompany`, { withCredentials: true });
                if (res.data.success) {
                    toast.success(res.data.message)
                    dispatch(setAllCompany(res.data.companies))
                    console.log(res.data)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchAllJob();
    }, [])
}

export default useGetAllCompanies