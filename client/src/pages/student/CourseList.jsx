import React, { useContext } from 'react'

const CourseList = () => {

	const {navigate}=useContext(AppContext)

  return (
	<>
	<div>
		<div>
			<h1>Course List</h1>
			<p className='text-gray-500'>
				<span className='text-blue-600 cursor-pointer'>Home</span> /<span> course List </span></p>
		</div>
	</div>
	</>
  )
}

export default CourseList
