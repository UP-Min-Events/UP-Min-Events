'use client'

import { useState } from 'react'
import { Inter } from 'next/font/google'

import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Page1({ nextPage }){
    
    const [eventName, setEventName] = useState<string>('')
    const [eventHost, setEventHost] = useState<string>('')
    const [eventDesc, setEventDesc] = useState<string>('')
    
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
                    onChange={(e) => setEventName(e.target.value)}
                />
            </div>
            <div>
                <p>Host</p>
                <input
                    type="text"
                    value={eventHost}
                    onChange={(e) => setEventHost(e.target.value)}
                />
            </div>
            <div id="desc">
                <p>Description</p>
                <input
                    type="text"
                    value={eventDesc}
                    onChange={(e) => setEventDesc(e.target.value)}
                />
            </div>

            <button id="formButton" className={inter.className} onClick={nextPage}>Next</button>
        </div>
    )
}