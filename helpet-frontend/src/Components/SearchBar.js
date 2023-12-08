import React, { useContext } from "react"
import {GoSearch} from 'react-icons/go'
import { PetContext } from "../context/PetContext"
import { handleChangeFunc, removeEmptyAttributes } from "../utils/generalFunctions";
import useApi from './../utils/api';
import { PaginationContext } from './../context/PaginationContext';

export default function SearchBar(props) {

  const {searchData, setSearchTrigger, setsearchData} = useContext(PetContext);
  const {setCurrentPage, setIsSearch} = useContext(PaginationContext);
  
  const handleChange = handleChangeFunc(setsearchData);
  
  const api = useApi();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSearch(true);
    setSearchTrigger(oldSearchTrigger => !oldSearchTrigger)
    console.log("setIsSearch(true);")
    setCurrentPage(1);
    console.log("setCurrentPage(1);")
  }

  return (
    <div className='search-container'>
      <form onSubmit={handleSubmit} className="search-bar">
        <div className="criteria">
          <label htmlFor="type" >Pet type : </label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            value={searchData.type}
          >
            <option selected value=""> Type </option>
            <option value="dog" /*defaultValue*/>dog</option>
            <option value="cat">cat</option>
            <option value="rabbit">rabbit</option>
            <option value="mouse">mouse</option>
            <option value="other">other</option>
          </select>
        </div>

        <div className="criteria">
          <label htmlFor="sex">Sex : </label>
          <select
            name="sex"
            id="sex"
            onChange={handleChange}
            value={searchData.sex}
          >
            <option selected value=""> Sex </option>
            <option value="female" /*defaultValue*/>female</option>
            <option value="male">male</option>
          </select>
        </div>

        <div className="criteria">
          <label htmlFor="age">age (in months) :</label>
          <input
              name="age"
              type="number"
              placeholder="months"
              onChange={handleChange}
              value={searchData.age}
          />
        </div>

        <div className="criteria">
          <button >
            <GoSearch />
            Search
          </button>
        </div>

      </form>
    </div>
  )
}
