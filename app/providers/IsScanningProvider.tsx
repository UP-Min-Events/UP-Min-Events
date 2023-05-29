'use client'

import { useContext, createContext, useState, useEffect } from "react";

interface IsScanningContextType {
    isScanning: boolean;
    eventID: string | null;
    updateIsScanning: (isScanning: boolean) => void;
    updateEventID: (eventID: string) => void;
}

export const IsScanningContext = createContext<IsScanningContextType>({
    isScanning: false,
    eventID: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    updateIsScanning: (isScanning: boolean) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    updateEventID: (eventID: string) => {},
})

export const IsScanningProvider = ({ children } : {
    children: React.ReactNode
}) => {

    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [eventID, setEventID] = useState<string | null>(null);

    const updateIsScanning = (arg: boolean): void => {
        setIsScanning(arg)
    }
    
    const updateEventID = (id: string): void => {
        setEventID(id)
    }

    return (
        <IsScanningContext.Provider 
            value={ 
                {
                    isScanning: isScanning,
                    eventID: eventID,
                    updateIsScanning: updateIsScanning,
                    updateEventID: updateEventID,
                }
            }
        >
            {children}
        </IsScanningContext.Provider>
    )
}

export const useIsScanningContext = () => useContext(IsScanningContext)