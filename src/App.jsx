import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import {Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
const App = () => {

const navigate=useNavigate();
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Logged In");
      navigate("/");  // optional: redirect logged-in users to home
    } else {
      console.log("Logged Out");
      navigate("/login");
    }
  });

  return () => unsubscribe(); // cleanup
}, [navigate]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/player/:id' element={<Player></Player>}></Route>
      </Routes>

    </div>
  )
}

export default App
