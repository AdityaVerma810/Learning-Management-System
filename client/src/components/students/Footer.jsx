import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
	<div>
	  <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
		<div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
			<div className='flex flex-col md:items-start items-center w-full'>
				<img className='   w-12 h-	12' src={assets.logoo} alt="logo"/>
				<h1 className='  text-white'>EduSpark</h1>
				<p className='text-white/80 mt-6 text-center md:text-left text-sm '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim pariatur eaque illum natus ut distinctio et excepturi quibusdam. Veritatis vitae minus nulla ullam adipisci rem. Ea odit sunt accusantium earum!</p>
			</div>
		</div>
		<div className='flex flex-col md:items-start items-center w-full'>
		<h2 className='font-semibold text-white mb-5'>Company</h2>
		<ul className='flex md:flex-col w-full justify-between textsm text-white/80 md:space-y-2'>
			<li><a href="#"/>Home</li>
			<li><a href="#"/>About Us</li>
			<li><a href="#"/>Contact us</li>
			<li><a href="#"/>privacy policy</li>
		</ul>
		</div>
		<div className='hidden md:flex flex-col items-start w-full'>
			<h2 className='front-semibold text-white mb-5' >Subscribe to our newsletter</h2>
			<p className='text-sm text-white/80'>The latest news, article, and resources , sent to your inbox weekly.</p>
			<div className='flex items-center gap-2 pt-4'>
				<input className='border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm' type="email" placeholder='Enter your email'/>
				<button className='bg-blue-600 w-24 h-9 text-white rounded'>Subscribe</button>
			</div>
		</div>
		
		<p className='text-white text-center'>copyright 2025 @AdityaVerma. All Right Reserved</p>
	  </footer>
	</div>
  )
}

export default Footer
