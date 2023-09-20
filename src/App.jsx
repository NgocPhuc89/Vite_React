
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
import EditStudent from './component/student/EditStudent';
import LeftSideBar from './component/layout/LeftSideBar';
import Footer from './component/layout/Footer';


function App() {
  return (
    <div className='d-flex'>
      <LeftSideBar />
      <div style={{ width: "100%" }}>
        <Navbar />
        <Routes>
          <Route path='/student/list' element={<StudentList />} />
          <Route path='/student/create' element={<CreateStudent />} />
          <Route path='/student/edit/:studentId' element={<EditStudent />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
