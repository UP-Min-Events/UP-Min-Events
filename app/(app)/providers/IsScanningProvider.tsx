'use client'

import { useContext, createContext, useState } from "react";

interface IsScanningContextType {
    isScanning: boolean;
    updateIsScanning: (isScanning: boolean) => void;
}

export const IsScanningContext = createContext<IsScanningContextType>({
    isScanning: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    updateIsScanning: (isScanning: boolean) => {},
})

export const IsScanningProvider = ({ children } : {
    children: React.ReactNode
}) => {

    const [isScanning, setIsScanning] = useState<boolean>(false);

    const updateIsScanning = (isScanning: boolean): void => {
        setIsScanning(isScanning)
    }

    return (
        <IsScanningContext.Provider value={{ isScanning: isScanning, updateIsScanning }}>
            {children}
        </IsScanningContext.Provider>
    )
}

export const useIsScanningContext = () => useContext(IsScanningContext)