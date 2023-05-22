'use client'

import { useContext, createContext, useState } from "react";

interface IsScanningContextType {
    isScanning: boolean;
    eventID: string;
    updateIsScanning: (isScanning: boolean) => void;
    updateEventID: (eventID: string) => void;
}

export const IsScanningContext = createContext<IsScanningContextType>({
    isScanning: false,
    eventID: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    updateIsScanning: (isScanning: boolean) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    updateEventID: (eventID: string) => {},
})

export const IsScanningProvider = ({ children } : {
    children: React.ReactNode
}) => {

    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [eventID, setEventID] = useState<string>('');

    const updateIsScanning = (isScanning: boolean): void => {
        setIsScanning(isScanning)
    }

    const updateEventID = (eventID: string): void => {
        setEventID(eventID)
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