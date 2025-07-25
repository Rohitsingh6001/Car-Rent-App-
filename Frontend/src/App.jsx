import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer.jsx'
import {Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Cars from './pages/Cars';
import MyBookings from './pages/MyBookings';
import Layout from './pages/owner/Layout.jsx'
import AddCar from './pages/owner/AddCar.jsx';
import Dashboard from './pages/owner/Dashboard.jsx';
import ManageBookings from './pages/owner/ManageBookings.jsx';
import ManageCars from './pages/owner/ManageCar.jsx';
import Login from './components/Login.jsx';

const App = () => {

  const [showLogin , setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith('/owner');

  return (
    <>
     {showLogin && <Login setShowLogin={setShowLogin}/> }
         
        {!isOwnerPath && <Navbar setShowLogin={setShowLogin}/>}


      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/car-details/:id' element={<CarDetails/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/owner' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-car' element={<AddCar/>}/>
          <Route path='manage-cars' element={<ManageCars/>}/>
          <Route path='manage-bookings' element={<ManageBookings/>}/>
        </Route>
      </Routes>
      <Footer/>

    </>
  )
}

export default App