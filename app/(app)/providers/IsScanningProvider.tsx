'use client'

import { useContext, createContext, useState } from "react";

interface IsScanningContextType {
    isScanning: boolean;
    eventID: string;
    updateIsScanning: (isScanning: boolean) => void;
    updateEventID: (eventID: string) => void;
    deleteLocalItem: () => void;
}

export const IsScanningContext = createContext<IsScanningContextType>({
    isScanning: false,
    eventID: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    updateIsScanning: (isScanning: boolean) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    updateEventID: (eventID: string) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    deleteLocalItem: () => {}
})

export const IsScanningProvider = ({ children } : {
    children: React.ReactNode
}) => {

    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [eventID, setEventID] = useState<string>('');

    const updateIsScanning = (isScanning: boolean): void => {
        setIsScanning(isScanning)
        localStorage.setItem('isScanning', isScanning.toString())
    }
    
    const updateEventID = (eventID: string): void => {
        setEventID(eventID)
        localStorage.setItem('eventId', eventID)
    }

    const deleteLocalItem = (): void => {
        localStorage.removeItem('eventId')
        localStorage.removeItem('isScanning')
    }

    return (
        <IsScanningContext.Provider 
            value={ 
                {
                    isScanning: isScanning,
                    eventID: eventID,
                    updateIsScanning: updateIsScanning,
                    updateEventID: updateEventID,
                    deleteLocalItem: deleteLocalItem
                }
            }
        >
            {children}
        </IsScanningContext.Provider>
    )
}

export const useIsScanningContext = () => useContext(IsScanningContext)