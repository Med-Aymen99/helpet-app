import React, { useContext } from "react"
import { NavigationContext } from "../context/NavigationContext";
import { PetContext } from "../context/PetContext"
import useApi from '../utils/api';
import { PaginationContext } from '../context/PaginationContext';
import { handleChangeFunc } from "../utils/generalFunctions";
import { Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePetList } from "../redux/petSlice";

export default function PetForm(props) {
    
    const [addPetData, setaddPetData] = React.useState({})
    const {selectedPetId,setSelectedPetId, updatePetData, setUpdatePetData} = useContext(PetContext)

    const [selectedImageFile, setselectedImageFile] = React.useState(null);
    const navigate = useContext(NavigationContext);
    const {setCurrentPage, numberOfPages} = useContext(PaginationContext)

    const api = useApi();
    const dispatch = useDispatch()

    const formData = props.update ? updatePetData : addPetData ;
    const setFormData = props.update ? setUpdatePetData : setaddPetData ;

    const handleChangeImage = (event) => {
        const imageFile = event.target.files[0];
        console.log(event.target.files[0])
        setselectedImageFile(imageFile);
    }
    const handleChange = handleChangeFunc(setFormData);
    
    const petFormData = (petData) => {
        const data = new FormData();
        data.append("name", petData.name);
        data.append("type", petData.type);
        data.append("breed", petData.breed);
        data.append("age", petData.age);
        data.append("sex", petData.sex);
        if (selectedImageFile) {
            data.append("imageFile", selectedImageFile);
        }
        return data;
    }

    const addPet = async () => {
        const data = petFormData(addPetData);
        try {
        const response = await api.post("/pets/create", data);
        console.log("response")
        setCurrentPage(numberOfPages)
        } catch(err) {
          alert(err);
        }
        navigate('/')
    };

    const updatePet = async () => {
        const data = petFormData(updatePetData);
        try {
            const response = await api.put(`/pets/update/${selectedPetId}`, data) ;
            const payload = {
                selectedPetId,
                updatePetData 
            }
            dispatch(updatePetList(payload))
        } catch (err) {
            console.log(err)
        }
        
        //event.preventDefault()
        //Router.History.back();
        navigate('/')
        
    };

    return (
        <div className="PetForm">
            <div className="form-container">
                <form onSubmit={props.update ? updatePet : addPet} className="pet-form animate form" >
                <h1>{props.update ? "Update Your Post" : "Give up for adoption"}</h1>
                    <div className="fields">
                        <div>
                            <div className="form-field">
                                <label htmlFor="name">name</label>
                                <input
                                    type="text"
                                    placeholder="name"
                                    onChange={handleChange}
                                    name="name"
                                    value={formData.name}
                                />
                                <br />
                            </div>
                            <div className="form-field">
                                <label htmlFor="type">type</label>
                                <input
                                    type="text"
                                    placeholder="type"
                                    onChange={handleChange}
                                    name="type"
                                    value={formData.type}
                                />
                                <br />
                            </div>
                            <div className="form-field">
                                <fieldset>
                                    <legend>What is their sex?</legend>
                                    <input
                                        type="radio"
                                        id="male"
                                        name="sex"
                                        value="male"
                                        checked={formData.sex === "male"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="male"> male</label>
                                    <br />
                                    <input
                                        type="radio"
                                        id="female"
                                        name="sex"
                                        value="female"
                                        checked={formData.sex === "female"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="female"> female</label>
                                </fieldset>
                                <br />
                            </div>
                        </div>
                        <div>
                            <div className="form-field">
                                <label htmlFor="age">age (in months)</label>
                                <input
                                    type="number"
                                    placeholder="months"
                                    onChange={handleChange}
                                    name="age"
                                    value={formData.age}
                                />
                                <br />
                            </div>
                            <div className="form-field">
                                <label htmlFor="breed">breed</label>
                                <input
                                    type="text"
                                    placeholder="breed"
                                    onChange={handleChange}
                                    name="breed"
                                    value={formData.breed}
                                />
                                <br />
                            </div>
                            <div className="form-field">
                                <label htmlFor="image">upload image</label>
                                <input
                                    type="file"
                                    onChange={handleChangeImage}
                                    name="image"
                                    // accept=".jpg"
                                />
                                <br />
                            </div>
                        </div>
                    </div>
                    <button className="form-button">
                    {props.update ? "Update pet" : "Add pet"}
                    </button>
                </form>
            </div>
        </div>
        
    )
}
