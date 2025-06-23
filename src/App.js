import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AddEditEmployee} from './pages/AddEditEmployee';
import {EmployeeList} from './pages/EmployeeList'
import Navbar from './components/Navbar';
import { HomePage } from './components/HomePage';
function App() {
  return (<>
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
          <Route path='/employees' element={<EmployeeList/>}/>
          <Route path='employees/add' element={<AddEditEmployee />} />
        <Route path='employees/edit/:id' element={<AddEditEmployee />} />
      </Routes>
    </>
  );
}

export default App;
