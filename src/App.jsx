import { useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Doctors from './pages/Doctors'

import Documents from './pages/Documents'
import Patients from './pages/Patients'
import Report from './pages/Report'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/doctors" element={<Doctors />} />        
       
          <Route path="/documents" element={<Documents />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/reports" element={<Report />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
