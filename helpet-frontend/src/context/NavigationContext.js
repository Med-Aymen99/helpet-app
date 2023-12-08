import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const NavigationContext = createContext();

export const NavigationProvider = ({children}) => {
    
    const navigate = useNavigate();

    return (
        <NavigationContext.Provider value={navigate}>
            {children}
        </NavigationContext.Provider>
    );
}