import React, { createContext, useContext } from "react";


export const PetContext = createContext();

const PetProvider = ({children}) => {
  
  const [updatePetData, setUpdatePetData] = React.useState({})
  const [selectedPetId,setSelectedPetId] = React.useState(-1);

  const [searchData, setsearchData] = React.useState(
  {
          type: "",
          age: "",
          sex: "",
  })
  const [searchTrigger, setSearchTrigger] = React.useState(false)
  
 
  return (
    <PetContext.Provider value={{ 
                                 searchData, setsearchData,
                                 searchTrigger, setSearchTrigger,
                                 updatePetData, setUpdatePetData,
                                 selectedPetId,setSelectedPetId
                                 }}>
        {children}               
    </PetContext.Provider>
  );
};
export default PetProvider;
