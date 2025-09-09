import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './component/Home';
import Profile from './component/Profile';
import Suggestion from './component/Suggestion'; 
import Chat from './component/Chat';
import Signup from './component/Signup';

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/suggestion" element={<Suggestion />} />  */}
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
