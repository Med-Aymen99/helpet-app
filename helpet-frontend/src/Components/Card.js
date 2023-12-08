import React, { useContext } from "react";
import {Link} from "react-router-dom";
import { PetContext } from "../context/PetContext";
import notAvailable from "../images/notAvailable.jpg"

export default function Card(props) {

    const {setSelectedPetId, setUpdatePetData} = useContext(PetContext)
    
    const updateForm = (item) =>  {
      setSelectedPetId(item.id)
      const {id, ...data} = item
      setUpdatePetData(data)
    };

    return (
          <div className="card" >
            <div className="pet-photo">
              <img className="pet--image" src={props.item.petImageFile ? `data:image/jpg;base64,${props.item.petImageFile }`: notAvailable} alt="Sorry we can't load the pet image."/>
            </div>
            <div className="pet-info">
              <p className="pet--name">{props.item.name}</p>
              <p className="pet--type">Type : {props.item.type}</p>
              <p className="pet--breed">Breed : {props.item.breed}</p>
              <p className="pet--sex">Sex : {props.item.sex}</p>
              <p className="pet--age">Age : {props.item.age} months</p>
              
              {props.isAuthenticated &&
                <button onClick={props.onClickDelete}>
                  Delete
                </button>
              }
              <Link to="/updateForm" className="Link-class">
                {props.isAuthenticated &&
                    <button onClick={() => updateForm(props.item)}>
                      Update
                    </button>
                }
              </Link>
            </div>
          </div>
    )
}
