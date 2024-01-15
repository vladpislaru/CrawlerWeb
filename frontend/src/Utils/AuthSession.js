import React, { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "./axios_main";
const AuthSession = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [currentPage, setCurrentPage] = useState(<></>)
    
    return (
        <AuthSession.Provider value={{auth, setAuth, currentPage, setCurrentPage}} >
            {children}
        </AuthSession.Provider>
    )
}

export default AuthSession;