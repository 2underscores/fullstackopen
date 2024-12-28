import { useState } from "react";
import { jwtDecode } from 'jwt-decode';

const authStoreKey = 'userAuthTokenStr'

const getTokenFromStorage = () => {
    const tokenStr = localStorage.getItem(authStoreKey)
    console.log({ tokenStr })
    if (!tokenStr) {
        console.log({ message: 'No user token found storage' });
        return null
    }
    const decodedToken = jwtDecode(tokenStr)
    console.log({ decodedToken })
    const tokenExpired = decodedToken.exp < Date.now() / 1000;
    if (tokenExpired) {
        console.log({ message: 'Token in storage expired, discarding' });
        localStorage.removeItem(authStoreKey)
        return null
    }
    return decodedToken
}

const useAuth = () => {
    const [auth, setAuthToken] = useState(getTokenFromStorage)
    const setAuth = (tokenStr) => {
        const decodedToken = jwtDecode(tokenStr)
        localStorage.setItem(authStoreKey, tokenStr)
        setAuthToken(decodedToken)
    }
    const clearAuth = () => {
        localStorage.removeItem(authStoreKey)
        setAuthToken(null)
    }
    return [auth, setAuth, clearAuth]
}

export default useAuth