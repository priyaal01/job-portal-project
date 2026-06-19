import React from 'react'
import Navbar from './shared/Navbar'
import Hero from './shared/Hero'
import CategoryCarousel from './shared/CategoryCarousel'
import LatestJobs from './shared/LatestJobs'
import Footer from './shared/Footer'

const Home = () => {
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