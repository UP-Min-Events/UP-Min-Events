'use client'

import { useContext, createContext, useState } from "react";

interface UserTypeContextType {
    userType: string;
    updateUserType: (type: string) => void;
}

export const UserTypeContext = createContext<UserTypeContextType>({
    userType: null,
    updateUserType: null
});

export const UserTypeProvider = ({ children }) => {

    const [userType, setUserType] = useState(null);

    const updateUserType = (type) => {
        setUserType(type);
    }

    return (
        <UserTypeContext.Provider value={{ userType, updateUserType }}>
            {children}
        </UserTypeContext.Provider>
    )
}

export const useUserTypeContext = () => useContext(UserTypeContext)