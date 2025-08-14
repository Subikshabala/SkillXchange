import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/Login';
import Signup from './component/Signup';

import { Avatar } from '@mui/material';

function App() {
  return (
   <div>
     
        <Routes>
            <Route path ="/" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} /> 
        
        
        </Routes>
      
    </div>
  );
}


export default App;


