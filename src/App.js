

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, Routes } from 'react-router-dom';

import Login from './component/Login';
import Signup from './component/Signup';




function App() {
  return (
    <div>
      

      {/* Optional main nav, since Home.js also has navbar */}
     
      {/* Routing */}
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/Signup" element={<Signup />} />
       
      </Routes>
    </div>
  );
}

export default App;