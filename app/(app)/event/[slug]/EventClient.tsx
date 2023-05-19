'use client'

import Details from './Details'
import QR from './QR'
import styles from './page.module.css'

import { useUserTypeContext } from '../../providers/UserTypeProvider'
import { useState } from 'react'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
                <>
                    <div className={styles.nav}>
                        <ArrowBackIcon onClick={handleShowDetails} sx={{ color: '#a70000', scale: '150%' }} />
                    </div>
                    <QR 
                        id={id} 
                    /> 
                </>
                : 
                <div>
                    <Details id={id} />
                    { userType === 'organizer' && 
                        <div className={styles['button-wrapper']}>
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
