import React, { createContext, useState } from 'react';
import config from '../config';
import { useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [loginFormData, setLogInFormData] = useState({
                username: "",
                password: ""
    })

    const [signUpFormData, setSignUpFormData] = useState({
                username: "",
                email: "",
                password: ""
    })
    
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: null,
        token: null,
    });
    
    const handleLogin = (user, token) => {
        setAuth({
        isAuthenticated: true,
        user,
        token,
        });
        // Save the token and user in localStorage
        localStorage.setItem(config.storage.tokenKey, token);
        localStorage.setItem(config.storage.userKey, JSON.stringify(user));
    };

    const handleLogout = () => {
        setAuth({
        isAuthenticated: false,
        user: null,
        token: null,
        });
        // Remove the token and user from localStorage
        localStorage.removeItem(config.storage.tokenKey);
        localStorage.removeItem(config.storage.userKey);
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, handleLogin, handleLogout, 
                                        loginFormData, setLogInFormData,
                                        signUpFormData, setSignUpFormData}}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;