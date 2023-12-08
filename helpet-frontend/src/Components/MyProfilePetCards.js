import React, { useContext, useEffect } from 'react';
import { NavigationContext } from "../context/NavigationContext";
import useApi from '../utils/api';
import { AuthContext } from "../utils/auth/AuthContext";
import Card from './Card';

export default function MyProfilePetCards(props) {
    const {auth} = useContext(AuthContext)
    const [userPetList, setUserPetList] = React.useState([])

    let navigate = useContext(NavigationContext);  
	const api = useApi();
	
	React.useEffect(() => {
        api.get("/pets/myProfile/")
        .then((response) => {
            console.log(response)
            setUserPetList(response.data)
        })
        .catch(err => console.log(err))
    },[])

    const deletePet = (petId) => {
        api.delete(`pets/delete/${petId}`)
            .then((response) => {
            console.log(`pet of id ${petId} has been deleted`)
            setUserPetList(oldUserPetList => oldUserPetList.filter(pet => pet.id != petId))
            })
            .catch((err) => console.log(err));
        navigate('/')
    }

    const Userpets = userPetList.map(item => {
        return <Card
            key = {item.id}
            item = {item}
            onClickDelete={() => deletePet(item.id)}
            isAuthenticated={auth.isAuthenticated}
        />
    })
    
    return(
    <section className="cards-list" >
            {Userpets}
    </section>
    )
}
