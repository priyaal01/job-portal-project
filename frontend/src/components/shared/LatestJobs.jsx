import React from 'react'
import JobCards from '../JobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job)
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className=' text-center font-bold text-5xl'><span className='bg-gradient-to-r bg-clip-text text-transparent from-green-500 to-green-600'>Latest </span>Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-8'>
                {
                    allJobs.length <= 0 ? <span>No Jobs Found at the Moment</span> : allJobs?.slice(0, 6).map((job) => <JobCards key={job._id} job={job} />)
                }

            </div>


        </div>
    )
}

export default LatestJobs