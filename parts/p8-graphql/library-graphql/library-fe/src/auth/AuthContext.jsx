import useAuth from "./useAuth"
import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={useAuth()}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider')
    }
    return context
}

export {useAuthContext, AuthProvider}
