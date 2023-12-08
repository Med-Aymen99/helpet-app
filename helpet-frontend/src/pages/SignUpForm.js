import React, { useContext, useMemo } from "react"
import {VscChromeClose} from 'react-icons/vsc'
import { NavigationContext } from "../context/NavigationContext";
import { signup } from "../utils/auth/AuthAPI";
import { handleChangeFunc } from "../utils/generalFunctions";
import { AuthContext } from '../utils/auth/AuthContext';
import useApi from '../utils/api';

export default function SignUpForm(props) {
    const navigate = useContext(NavigationContext);
    const {signUpFormData, setSignUpFormData} = useContext(AuthContext)
    
    const handleChange = useMemo(() => handleChangeFunc(setSignUpFormData));

    const api = useApi()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/user/register", signUpFormData);
        } catch (error) {
            console.log(error);
        }
        navigate('/')
    }
    return (
        <div >
            <div className="user-backgound"></div>
            <div className="form-container">
                <div className="user-form-container">
                    <div className="imgdiv img-signup"></div>
                    <form className="user-form form animate" onSubmit={handleSubmit}>
                        <h2>Sign up</h2>
                        <div className="form-field">
                            <label htmlFor="username">username :</label>
                            <input
                                required
                                type="text"
                                placeholder="insert your username"
                                onChange={handleChange}
                                name="username"
                                value={signUpFormData.username}
                            />
                            <br /> 
                        </div>
                        <div className="form-field">
                            <label htmlFor="email">email :</label>
                            <input
                                required
                                type="email"
                                placeholder="insert your email"
                                onChange={handleChange}
                                name="email"
                                value={signUpFormData.email}
                            />
                            <br />
                        </div>
                        <div className="form-field">
                            <label htmlFor="password">password :</label>
                            <input
                                required
                                type="password"
                                placeholder="insert your password"
                                onChange={handleChange}
                                name="password"
                                value={signUpFormData.password}
                            />
                            <br />
                        </div>
                            <button className="form-button">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}