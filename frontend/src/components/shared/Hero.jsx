import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


const Hero = () => {
  return (
    <div className='mt-4 text-center '>
      <div className='flex flex-col gap-7 my-16'>

        <h1 className='text-5xl font-bold leading-tight'>Find Your Dream Job and <br /> Build Your <span className=' bg-gradient-to-r bg-clip-text text-transparent from-green-500 to-green-600'>Future</span></h1>
        <span className='text-md font-semibold mt-0'>Discover thousands of opportunities from <br />top companies and take the next step in your career journey.</span>
        <span className='mx-auto text-white text-md bg-slate-200 px-4 py-2 border border-black bg-gradient-to-b from-green-500 to-green-600 rounded-full'>Best Job Portal in 2026</span>


      </div>
      <div className='flex justify-center items-center leading-tight'>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D" alt="@shadcn" className='object-cover' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D" alt="@maxleiter" className='object-cover' />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://images.unsplash.com/photo-1601392561050-340745ba9c25?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D"
            alt="@evilrabbit" className='object-cover '
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <span className='text-gray-500 text-lg ml-2'>Trusted by 2M+ Students</span>
      </div>
    </div>
  )
}

export default Hero;