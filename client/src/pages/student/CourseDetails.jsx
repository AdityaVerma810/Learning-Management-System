import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import Loading from '../../components/students/Loading';

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const {
    allCourses,
    calculateRating,
    calculateCourseDuration,
    calculateChapterTime,
    // calculateNumberOfLectures (Optional - use only if defined)
  } = useContext(AppContext);

  const fetchCourseData = () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, [id, allCourses]);

  if (!courseData) return <Loading />;

  const rating = calculateRating(courseData);
  const ratingCount = courseData.courseRatings?.length || 0;
  const duration = calculateCourseDuration(courseData);

  return (
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
      <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70'></div>

      <div className='max-w-xl z-10 text-gray-500'>
        <h1 className='md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800'>
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
          <p className='text-blue-600'>
            {ratingCount} {ratingCount > 1 ? 'ratings' : 'rating'}
          </p>
          <p>
            {courseData.enrolledStudents.length}{' '}
            {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}
          </p>
        </div>

        <p className='text-sm'>
          Course by <span className='text-blue-600 underline'>Aditya Verma</span>
        </p>

        {/* Course Structure */}
        <div className='pt-8 text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          <p className='text-sm text-gray-500 pt-1'>
            Total Duration: {duration}
          </p>

          <div className='pt-5'>
            {courseData.courseContent?.map((chapter, index) => (
              <div key={index} className='mb-4 border-b pb-2'>
                <div className='flex items-center gap-2'>
                  <img src={assets.down_arrow_icon} alt='arrow icon' className='w-4 h-4' />
                  <p className='font-medium'>{chapter.chapterTitle}</p>
                </div>
                
                <p className='text-xs text-gray-500 ml-6'>
                  {chapter.chapterContent.length} lecture- {calculateChapterTime(chapter)}
                </p>
              </div>
              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
