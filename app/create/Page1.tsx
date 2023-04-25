'use client'

import { useState } from 'react'

export default function Page1(){
    
    const [eventName, setEventName] = useState<string>('')
    const [eventHost, setEventHost] = useState<string>('')
    const [eventDesc, setEventDesc] = useState<string>('')
    
    return(
        <div>
            <h1>Page 1</h1>       
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
            <div>
                <p>Description</p>
                <input
                    type="text"
                    value={eventDesc}
                    onChange={(e) => setEventDesc(e.target.value)}
                />
            </div>
        </div>
    )
}