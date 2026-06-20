import React from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import Job from './Job';

const jobs=[1,2,3,5,6,7,8,9,10,11,12,12,13,14,15,16];

const Browse = () => {
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='ml-2 p-2 text-xl font-bold'>Search Results ({jobs.length})</h1>
        <div className='grid grid-cols-3 gap-4'>
          {
          jobs.map((item,index)=>(
            <div>
              <Job/>
            </div>
          ))
          }
        </div>

      </div>
      <Footer/>

    </div>
  )
}

export default Browse