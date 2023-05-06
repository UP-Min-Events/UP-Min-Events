'use client'

import Details from './Details'
import QR from './QR'
import styles from './page.module.css'

import { useUserTypeContext } from '../../UserTypeProvider'
import { useState } from 'react'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

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
                <div>
                    <Details id={id} />
                    { userType === 'organizer' && 
                        <div className={styles.button}>
                            <button className={styles.buttonL} onClick={handleShowQR}>
                                <QrCodeScannerIcon /> <h2> Show QR </h2>
                            </button> 
                        </div>
                    }
                </div>
            }
        </div>
    )
}
