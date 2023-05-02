'use client'

import { useContext, createContext, useState, useEffect } from "react";

interface UserTypeContextType {
    userType: string;
    updateUserType: (type: string) => void;
}

export const UserTypeContext = createContext<UserTypeContextType>({
    userType: '',
    updateUserType: null
});

export const UserTypeProvider = ({ children } : {
    children: React.ReactNode
}) => {

    const [userType, setUserType] = useState(null);

    useEffect(() => {
        setUserType(localStorage.getItem('userType'))
    }, [])

    const updateUserType = (type) => {
        localStorage.setItem('userType', type)
        setUserType(type)
    }

    return (
        <UserTypeContext.Provider value={{ userType, updateUserType }}>
            {children}
        </UserTypeContext.Provider>
    )
}

export const useUserTypeContext = () => useContext(UserTypeContext)