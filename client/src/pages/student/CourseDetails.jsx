import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import Loading from '../../components/students/Loading';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/students/Footer';
import YouTube from 'react-youtube'
const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData]=useState(null)

  const {
    allCourses,
    calculateRating,
    calculateCourseDuration,
    calculateChapterTime,
    currency,
  } = useContext(AppContext);

  // ✅ Helper: Calculate total lectures
  const calculateNoOfLectures = (course) => {
    if (!course || !course.courseContent) return 0;
    return course.courseContent.reduce(
      (total, chapter) => total + (chapter.chapterContent?.length || 0),
      0
    );
  };

  const fetchCourseData = () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, [id, allCourses]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!courseData) return <Loading />;

  const rating = calculateRating(courseData);
  const ratingCount = courseData.courseRatings?.length || 0;
  const duration = calculateCourseDuration(courseData);
  const totalLectures = calculateNoOfLectures(courseData);
  const discountedPrice = (
    courseData.coursePrice -
    (courseData.discount * courseData.coursePrice) / 100
  ).toFixed(2);

  return (
    <>
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
                alt='star'
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
          <p className='text-sm text-gray-500 pt-1'>Total Duration: {duration}</p>

          <div className='pt-5'>
            {courseData.courseContent?.map((chapter, index) => (
              <div
                key={index}
                className='mb-4 border-b pb-2 cursor-pointer'
                onClick={() => toggleSection(index)}
              >
                <div className='flex items-center gap-2'>
                  <img
                    className={`transform transition-transform w-4 h-4 ${
                      openSections[index] ? 'rotate-180' : ''
                    }`}
                    src={assets.down_arrow_icon}
                    alt='arrow icon'
                  />
                  <p className='font-medium'>{chapter.chapterTitle}</p>
                </div>

                <p className='text-xs text-gray-500 ml-6'>
                  {chapter.chapterContent.length} lecture
                  {chapter.chapterContent.length > 1 ? 's' : ''} -{' '}
                  {calculateChapterTime(chapter)}
                </p>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSections[index] ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className='flex items-start gap-2 py-1'>
                        <img
                          src={assets.play_icon}
                          alt='play icon'
                          className='w-4 h-4 mt-1'
                        />
                        <div className='flex item-center justify-between w-full text-gray-800 text-xs md:text-default'>
                          <p className='font-medium text-sm'>
                            {lecture.lectureTitle}
                          </p>
                          <div className='text-xs text-gray-500 flex gap-3'>
                            {lecture.isPreviewFree && (
                              <span onClick={()=>setPlayerData({videoId : lecture.lectureUrl.split('/').pop()})} className='text-green-600 font-semibold'>
                                Preview
                              </span>
                            )}
                            <span>
                              {humanizeDuration(
                                lecture.lectureDuration * 60 * 1000,
                                {
                                  units: ['h', 'm'],
                                  round: true,
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='py-20 text-sm md:text-default'>
          <h3 className='text-xl font-semibold text-gray-800'>
            Course Description
          </h3>
          <p
            className='pt-3 rich-text'
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription || '',
            }}
          ></p>
        </div>
      </div>

      {/* Side Price Card */}
      <div className='max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]'>
        <img src={courseData.courseThumbnail} alt='Course thumbnail' />
        <div className='p-4'>
          <div className='flex items-center gap-2'>
            {

              playerData ?
              <YouTube videoId={playerData.videoId} opts={{playerVars :{autoplay: 1} }} iframeClassName='w-full aspect-video' />
              : <img src={assets.time_left_clock_icon} alt='time icon' />
            }
            
            <p className='text-red-500 font-medium'>
              7 days left at this price!
            </p>
          </div>

          <div className='flex gap-3 items-center pt-2'>
            <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>
              {currency} {discountedPrice}
            </p>
            <p className='text-lg text-gray-500 line-through'>
              {currency} {courseData.coursePrice}
            </p>
            <p className='text-lg text-gray-500'>{courseData.discount}% off</p>
          </div>

          <div className='flex items-center text-sm md:text-default gap-4 pt-4 text-gray-500'>
            <div className='flex items-center gap-1'>
              <img src={assets.star} alt='star icon' />
              <p>{rating.toFixed(1)}</p>
            </div>
            <div className='h-4 w-px bg-gray-500/40'></div>
            <div className='flex items-center gap-1'>
              
              <img src={assets.time_clock_icon} alt='clock icon' />
              <p>{duration}</p>
            </div>
            <div className='h-4 w-px bg-gray-500/40'></div>
            <div className='flex items-center gap-1'>
              <img src={assets.lesson_icon} alt='lesson icon' />
              <p>{calculateNoOfLectures(courseData)} lessons</p>
            </div>
          </div>
        <button className='md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium' >{isAlreadyEnrolled ?'Already Enrolled' : 'Enroll Now'}</button>
        <div>
          <p className='md: text-xl text-lg font-medium text-gray-800'>What's in the course ?</p>
          <ul>
            <li>lifetime access with free updates</li>
            <li>Step-by-step, hands-on project guidance</li>
            <li>Downloadable resources and source code</li>
            <li>Quizzes to test your Knowledge</li>
            <li>Certificate of completion</li>
          </ul>
        </div>
        </div>
        
      </div>
            
    </div>
    <Footer/>
    </>
  );
};

export default CourseDetails;
