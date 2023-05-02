'use client'

import { useContext, createContext, useState, useEffect } from "react";

interface UserTypeContextType {
    userType: string;
    updateUserType: (type: string) => void;
}

export const UserTypeContext = createContext<UserTypeContextType>({
    userType: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    updateUserType: (type: string) => {},
});

export const UserTypeProvider = ({ children } : {
    children: React.ReactNode
}) => {

    const [userType, setUserType] = useState<string | null>(null);

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