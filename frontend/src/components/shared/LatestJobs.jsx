import React from 'react'
import JobCards from '../JobCards';

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className=' text-center font-bold text-5xl'><span className='bg-gradient-to-r bg-clip-text text-transparent from-green-500 to-green-600'>Latest </span>Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-8'>
                {
                    randomJobs.slice(0,6).map((item, index) => <JobCards />)
                }

            </div>


        </div>
    )
}

export default LatestJobs