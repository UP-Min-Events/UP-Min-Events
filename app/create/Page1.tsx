'use client'

import { Button } from '@mui/material'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface Props {
    nextPage: () => void,
    eventName: string,
    eventHost: string,
    eventDesc: string,
    handleEventNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventHostChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventDescChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function Page1({ 
    nextPage, 
    eventName,
    eventHost,
    eventDesc,
    handleEventNameChange, 
    handleEventHostChange, 
    handleEventDescChange 
} : Props) {
    
    return(
        <div>
            <h1>Page 1</h1>       
            <div>
                <p>Title</p>
                <input
                    type="text"
                    value={eventName}
                    onChange={handleEventNameChange}
                />
            </div>
            <div>
                <p>Host</p>
                <input
                    type="text"
                    value={eventHost}
                    onChange={handleEventHostChange}
                />
            </div>
            <div>
                <p>Description</p>
                <input
                    type="text"
                    value={eventDesc}
                    onChange={handleEventDescChange}
                />
            </div>
            <Button 
                    variant="text" 
                    className={inter.className} 
                    onClick={nextPage}
                    sx={{
                        position: 'fixed',
                        bottom: '3rem',
                        backgroundColor: '#a70000',
                        color: '#fff',
                        fontWeight: 'bold',
                        width: '12em',
                        borderRadius: '1em',    
                        mx: 'auto',
                    }}
                >
                    Next
                </Button> 
        </div>
    )
}