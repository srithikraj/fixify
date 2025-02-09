import React from 'react'
import Footer from '../components/Footer/footer'
import Hero from '../components/Hero/hero'
import HowItWorks from '../components/howitworks/howworks'
import Navbar from '../components/Navbar/Navbar'
import ReadyToGetStarted from '../components/getstarted/getstarted'
import ServicesSection from '../components/serviceSection/serviceSection'


function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <ServicesSection />
      <ReadyToGetStarted />
      <Footer />
    </>
  )
}

export default Home