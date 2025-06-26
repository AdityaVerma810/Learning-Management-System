import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

const CourseDetails = () => {
  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const { allCourses } = useContext(AppContext)

  const fetchCourseData = async () => {
    const findCourse = allCourses.find(course => course._id === id)
    setCourseData(findCourse)
  }

  useEffect(() => {
    fetchCourseData()
  }, [id, allCourses])

  return (
    <div>
      <h1>Course Details Page</h1>
      {courseData ? (
        <div>
          <h2>{courseData.title}</h2>
          <p>{courseData.description}</p>
          
        </div>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  )
}

export default CourseDetails
