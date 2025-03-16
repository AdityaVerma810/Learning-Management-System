import React from 'react'
import Hero from '../../components/students/Hero'
import Companies from '../../components/students/Companies'
import CourseSection from '../../components/students/CourseSection'
import TestimonialSection from '../../components/students/TestimonialSection'
import CallTOAction from '../../components/students/CallTOAction'
import Footer from '../../components/students/Footer'


const Home = () => {
  return (
	<div className='flex flex-col items-center space-y-7 text-center'>
		
	  <Hero/>
	  <Companies/>
	  <CourseSection/>
	  <TestimonialSection/>
	  <CallTOAction/>
	  <Footer/>
	</div>
  )
}

export default Home
