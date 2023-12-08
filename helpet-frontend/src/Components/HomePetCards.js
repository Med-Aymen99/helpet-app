import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPetList } from '../redux/petSlice';
import useApi from '../utils/api';
import { removeEmptyAttributes } from '../utils/generalFunctions';
import Card from './Card';
import { PaginationContext } from './../context/PaginationContext';
import { PetContext } from './../context/PetContext';

export default function HomePetCards(props) {

  const {isSearch, setNumberOfPages, currentPage } = useContext(PaginationContext)
  const {searchData, searchTrigger} = useContext(PetContext)
  
  const api = useApi();

  const dispatch = useDispatch();
  let petList = useSelector(state =>  state.pet.petList);

  React.useEffect(() => {
    console.log("inside useEff")
    isSearch ? filterPets() : getAllPets()
    console.log("ok")
   
  },[currentPage, searchTrigger])

  // fonctionnalité 1 : affichage des pets
  const getAllPets = async () => {
    try {
      const response = await api.get("/pets/petListPages/", {params: {page: currentPage}});
      dispatch(setPetList(response.data.items))
      setNumberOfPages(response.data.total);
    } catch (err) {
      console.log(err);
    }
  };

  // fonctionnalité 2 : recherche des pets
  const filterPets = () => {
    console.log("inside filterPets")
    const newsearchData = removeEmptyAttributes(searchData) ;
    const filteredSearchData = {
      data : newsearchData,
      page : currentPage
    }
    api.get("/pets/Paginatedfilter", {params: filteredSearchData}).then((response) => {
        dispatch(setPetList(response.data.items))
        setNumberOfPages(response.data.total)
    })
  }

    const pets = petList.map(item => {
      return <Card
          key = {item.id}
          item = {item}
      />
    })
    return (
        <section className="cards-list" >
            {pets}
        </section>
    )
}