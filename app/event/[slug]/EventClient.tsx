'use client'

import Details from './Details'
import QR from './QR'
import styles from './page.module.css'

import { useUserTypeContext } from '../../UserTypeProvider'
import { useState } from 'react'
import { Button } from '@mui/material'

export default function EventClient({ id } : { id: string }) {

    const { userType } = useUserTypeContext()
    const [showQR, setShowQR] = useState(false)

    const handleShowQR = () => {
        setShowQR(true)
    }

    const handleShowDetails = () => {
        setShowQR(false)
    }

    return (
        <div>
            { showQR ? 
                <QR 
                    id={id} 
                    handleShowDetails={handleShowDetails} 
                /> 
                : 
                <div id={styles.qrButton}>
                    <Details id={id} />
                    { userType === 'organizer' && 
                        <Button variant="text" 
                        sx={{
                            mx: 'auto',
                            backgroundColor: '#a70000',
                            color: '#fff',
                            fontWeight: 'bold',
                            width: '80%',
                            height: '3.5em',
                            borderRadius: '1em',
                        }}
                        onClick={handleShowQR}
                    >
                        Show QR
                        </Button> 
                    }
                </div>
            }
        </div>
    )
}
