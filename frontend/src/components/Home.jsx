import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Hero from './shared/Hero'
import CategoryCarousel from './shared/CategoryCarousel'
import LatestJobs from './shared/LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const { user } =useSelector(store=>store.auth)
  const navigate=useNavigate();


  useEffect(()=>{
    if(user?.role==="recruiter"){
      navigate('/admin/company')
    }
  },[])
  return (
    <div>
      <Navbar />
      <Hero />
      <CategoryCarousel />
      <LatestJobs/>
      <Footer/>

    </div>
  )
}

export default Home