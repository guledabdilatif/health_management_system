import { useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Staffs from './pages/Staffs'

import Documents from './pages/Documents'
import Patients from './pages/Patients'
import Report from './pages/Report'
import PatientDetailsPage from "./pages/PatientDetailsPage";
import NotFound from './components/NotFound'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/staffs" element={<Staffs />} />      
          <Route path="/documents" element={<Documents />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/reports" element={<Report />} />
                  <Route path="/patients/:id" element={<PatientDetailsPage />} />

          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
