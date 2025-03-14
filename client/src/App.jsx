import React from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import Home from './pages/student/Home';
import CourseList from './pages/student/CourseList';
import CourseDetails from './pages/student/CourseDetails';
import MyEnrollement from './pages/student/MyEnrollement';
import Player from './pages/student/Player';
import Loading from './components/students/Loading';
import Educator from './pages/educator/Educator';
import Dashboard from './pages/educator/Dashboard';
import AddCourse from './pages/educator/AddCourse';
import StudentsEnrolled from './pages/educator/StudentsEnrolled';
import MyCourses from './pages/educator/MyCourses';
import Navbar from './components/students/Navbar';

const App = () => {
  const isEducator=useMatch('/educator/*')
  return (
    <div className='text-default min-h-screen bg-white'>
      {! isEducator && <Navbar/>}
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/course-list" element={<CourseList/>} />
      <Route path="/course-list/:input" element={<CourseList/>} />
      <Route path="/course/:id" element={<CourseDetails/>} />
      <Route path="/my-enrollements" element={<MyEnrollement/>} />
      <Route path="/player/:courseID" element={<Player/>} />
      <Route path="/loading/:path" element={<Loading/>} />
      <Route path='/educator' element={<Educator/>}>
        <Route path='educator' element={<Dashboard/>}/>
        <Route path='add-course' element={<AddCourse/>}/>
        <Route path='my-course' element={<MyCourses/>}/>
        <Route path='student-enrolled' element={<StudentsEnrolled/>}/>

      </Route>
        
    </Routes>
    </div>
  );
};

export default App;
