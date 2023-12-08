import React, { useContext, useState } from "react"
import PetForm from "./pages/PetForm"
import About from "./pages/About"
import {Route, Routes} from 'react-router-dom'
import Home from "./pages/Home"
import { PaginationContext } from "./context/PaginationContext"
import useApi from './utils/api';
import { PetContext } from './context/PetContext';
import { removeEmptyAttributes } from "./utils/generalFunctions"
import LoginForm from './pages/LoginFrom';
import SignUpForm from './pages/SignUpForm';
import { AuthContext } from './utils/auth/AuthContext';
import Navbar from "./Components/Navbar"
import MyProfile from "./pages/MyProfile"

export default function App(props) {
    const {setAuth} = useContext(AuthContext)

    // Check if a user is authenticated & set the "isAuthenticated" to true
    React.useEffect(() => {
        if (localStorage.getItem('auth_token')) {
            setAuth(prevAuth => ({
                ...prevAuth,
                isAuthenticated : true,
            }))
        }
    }, [])

    return (
        <div>
          <Navbar/>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/CreatePost" element={<PetForm update={false} />} />
              <Route path="/updateForm" element={<PetForm update={true} />} />
              <Route path="/about" element={<About/>} />
              <Route path="/Login" element={<LoginForm />} />
              <Route path="/SignUp" element={<SignUpForm />} />
              <Route path="/MyProfile" element={<MyProfile />} /> 
          </Routes>
        </div>
    )
}