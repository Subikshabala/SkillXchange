import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Login from './Components/Login'
import AddSkill from './Components/AddSkill'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-600 via-blue-400 to-blue-900 flex items-center justify-center">
      <Navbar />
      <Login />
      <Routes>
       <Route path="/addskill" element={<AddSkill />}/>
       </Routes>
    </div>
  )
}

export default App