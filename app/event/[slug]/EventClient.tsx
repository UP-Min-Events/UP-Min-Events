'use client'

import Details from './Details'
import QR from './QR'

import { useUserTypeContext } from '../../UserTypeProvider'
import { useState } from 'react'

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
                        <button onClick={handleShowQR}>Show QR</button>
                    }
                </div>
            }
        </div>
    )
}
