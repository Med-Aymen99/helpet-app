import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    petList: [],
    isLoading: true,
};

const petSlice = createSlice({
    name:'pet',
    initialState,
    reducers: {
        setPetList: (state, action) => {
            state.petList = action.payload
        },
        updatePetList : (state, action) => {
            const {selectedPetId, updatePetData } = action.payload;
            const selectedPetIndex = state.petList.findIndex(pet => pet.id == selectedPetId)
            const item = {
                id : selectedPetId,
                ...updatePetData
            }
            state.petList.splice(selectedPetIndex,1,item);
        },
        
    },
})


export const { setPetList, updatePetList } = petSlice.actions;
export default petSlice.reducer;
