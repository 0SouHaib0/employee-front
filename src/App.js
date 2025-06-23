import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AddEditEmployee} from './pages/AddEditEmployee';
import {EmployeeList} from './pages/EmployeeList'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList/>} />
        <Route path="/add" element={<AddEditEmployee />} />
        <Route path="/edit/:id" element={<AddEditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
