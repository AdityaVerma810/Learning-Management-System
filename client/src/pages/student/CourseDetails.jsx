import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import Loading from '../../components/students/Loading';

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { allCourses, calculateRating } = useContext(AppContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find(course => course._id === id);
    setCourseData(findCourse);
  };
  // function to calculate course chaptr time
  

  useEffect(() => {
    fetchCourseData();
  }, [id, allCourses]);

  if (!courseData) return <Loading />;

  const rating = calculateRating(courseData);
  const ratingCount = courseData.courseRatings?.length || 0;

  return (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
        <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70'></div>
        <div className='max-w-xl z-10 text-gray-500'>
          <h1 className='md:text-course-deatails-heading-large text-course-deatails-heading-small font-semibold text-gray-800'>
            {courseData.courseTitle}
          </h1>

          <p
            className='pt-4 text-base text-sm'
            dangerouslySetInnerHTML={{
              __html: (courseData.courseDescription || '').slice(0, 200),
            }}
          ></p>

          {/* Review and Rating */}
          <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
            <p className='font-semibold text-gray-700'>{rating.toFixed(1)}</p>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                  alt=''
                  className='w-3.5 h-3.5'
                />
              ))}
            </div>
            <p className='text-blue-600 '>{courseData.courseRatings.length} {courseData.courseRatings.length >1 ? 'ratings ': 'rating'}</p>

            <p>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ?'students' : 'student'}</p>
            
          </div>
          <p className='text-sm'>Course by <span className='text-blue-600 underline'>Aditya Verma</span></p>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
