'use client'

import { Inter } from 'next/font/google'
import Link from 'next/link'

import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

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
        <div id="form">
            <div id="formHeader">
                <IconButton size="large"
                        sx={{
                            scale: '1.4',
                            position: 'relative',
                            left: '0',
                            color: '#a70000',
                            fontWeight: 'bold',
                            padding: '0',
                            mb: '1em',
                        }}> 
                        <Link href="\">
                            <ArrowBackIcon /> 
                        </Link>
                </IconButton> 
                <h1>Create Event</h1>
                <div id="progressBar">
                    <div id="progress"> </div> <div id="progress1"> </div> 
                </div>   
            </div>    
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
            <div id="desc">
                <p>Description</p>
                <input
                    type="text"
                    value={eventDesc}
                    onChange={handleEventDescChange}
                />
            </div>

            <button id="formButton" className={inter.className} onClick={nextPage}>Next</button>
        </div>
    )
}