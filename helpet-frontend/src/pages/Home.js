import React, { useContext, useEffect } from "react"
import Navbar from "../Components/Navbar"
import Intro from "../Components/Intro"
import { PetContext } from "../context/PetContext"
import { AuthContext } from "../utils/auth/AuthContext"
import Card from "../Components/Card"
import Pagination from "../Components/PaginationButtons"
import SearchBar from "../Components/SearchBar"
import useApi from './../utils/api';
import { NavigationContext } from './../context/NavigationContext';
import HomePetCards from "../Components/HomePetCards"
import PaginationButtons from "../Components/PaginationButtons"

export default function Home(props) {

  return (
    <div className="page-content">
      <Intro />
      <SearchBar />
      <HomePetCards />
      <div className="pagination">
        <PaginationButtons />
      </div>
    </div>
  )
}
