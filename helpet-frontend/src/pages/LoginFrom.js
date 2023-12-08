import React, { useContext, useMemo } from "react"
import { NavigationContext } from "../context/NavigationContext";
import { handleChangeFunc } from "../utils/generalFunctions";
import { AuthContext } from '../utils/auth/AuthContext';

import useApi from '../utils/api';


export default function LoginForm(props) {
    let navigate = useContext(NavigationContext);    
    const {handleLogin, loginFormData, setLogInFormData} = useContext(AuthContext);

    const handleChange = useMemo(() => handleChangeFunc(setLogInFormData));
    
    const api = useApi()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/user/login",loginFormData);
            const data = response.data
            handleLogin(data.user, data.acces_token);
        } catch (error) {
            console.log(error);
        }
        navigate('/')
    }

    return (
        <div>
            <div className="user-backgound"></div>
            <div className="form-container">
                <div className="user-form-container">
                    <div className="imgdiv img-login"></div>
                    <div className="user-form">
                        <form className=" form animate" onSubmit={handleSubmit}>
                            <h2>Login</h2>
                            <div className="form-field">
                                <label htmlFor="username">username :</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="insert your username"
                                    onChange={handleChange}
                                    name="username"
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
                                />
                                <br />
                            </div>
                            <button className="form-button">Log In</button>
                        </form>
                        {/* <p className="forgetpwd">
                            <Link to="/ForgetPwd">Forgot password?</Link>
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
