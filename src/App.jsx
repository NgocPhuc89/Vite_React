
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import { TowWayBinding } from './component/TwoWayBindingJS'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './component/layout/Navbar';
import { Route, Routes } from 'react-router';
import { StudentList } from './component/student/StudentList';
import CreateStudent from './component/student/CreateStudent';
import { useState } from 'react';


function App() {
  const [list, setList] = useState([]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/student/list' element={<StudentList studentList={list} setStudentList={setList} />} />
        <Route path='/student/create' element={<CreateStudent studentList={list} setStudentList={setList} />} />
      </Routes>
    </>
  )
}

export default App
