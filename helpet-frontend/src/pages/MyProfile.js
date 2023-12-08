import React, { useContext } from "react"
import { PetContext } from './../context/PetContext';
import { AuthContext } from './../utils/auth/AuthContext';
import useApi from './../utils/api';
import { NavigationContext } from './../context/NavigationContext';
import Card from './../Components/Card';
import MyProfilePetCards from "../Components/MyProfilePetCards";

export default function MyProfile(props) {
    const {auth} = useContext(AuthContext)
  
    const user = auth.user || JSON.parse(localStorage.getItem('user'))
    
    return(
    <div className="page-content">
        <h1 className="welcome-user">Welcome {user.username}</h1>
        <h2>These are your adoption posts :</h2>
        <MyProfilePetCards />
    </div>
    )

}