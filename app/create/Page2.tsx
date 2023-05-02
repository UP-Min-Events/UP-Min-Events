import { Inter } from 'next/font/google'

import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const inter = Inter({ subsets: ['latin'] })

interface Props {
    createEvent: () => void,
    prevPage: () => void,
    eventDate: string,
    eventTime: string,
    eventVenue: string,
    handleEventDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventVenueChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function Page2({ 
    createEvent, 
    prevPage,
    eventDate,
    eventTime,
    eventVenue,
    handleEventDateChange,
    handleEventTimeChange,
    handleEventVenueChange,
} : Props ) {
    
    const finish = () => {
        createEvent()
    }

    const back = () => {
        prevPage()
    }

    return(
        <div id="form">
            <div id="formHeader">
                <IconButton size="large" onClick={back}
                        sx={{
                            scale: '1.4',
                            position: 'relative',
                            left: '0',
                            color: '#a70000',
                            fontWeight: 'bold',
                            padding: '0',
                            mb: '1em',
                        }}> 
                        <ArrowBackIcon /> 
                </IconButton> 
                <h1>Create Event</h1>
                <div id="progressBar">
                    <div id="progress"> </div> <div id="progress"> </div> 
                </div>   
            </div>
            <div>
                <p>Date</p>
                <input
                    type="date"
                    value={eventDate}
                    onChange={handleEventDateChange}
                />
            </div>
            <div>
                <p>Time</p>
                <input
                    type="time"
                    value={eventTime}
                    onChange={handleEventTimeChange}
                />
            </div>
            <div>
                <p>Venue</p>
                <input 
                    type="text"
                    value={eventVenue}
                    onChange={handleEventVenueChange} 
                />
            </div>
            <div>
                <p>Population Limit</p>
                <input type="range" />
            </div>
            <div>
                <p>Visibility</p>
                <select name="" id="">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
            </div>
            <div>
                <p>Restrictions</p>
                <input type="text" />
            </div>
            <button id="formButton" className={inter.className} onClick={finish}>Finish</button>
        </div>
    )
}