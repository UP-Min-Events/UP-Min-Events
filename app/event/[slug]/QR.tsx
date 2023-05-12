'use client'

import { useEffect } from 'react'
import styles from './page.module.css'
import QRCode from 'qrcode'

interface Props {
    id: string,
}

export default function QR({ id } : Props) {

    
    const saveQR = () => {
        const image = document.getElementById('qrcode') as HTMLCanvasElement 
        const a = document.createElement('a')
    
        a.download = 'QRCode.png'
        a.href = image.toDataURL("image/png")
        a.style.display = 'none'
        
        a.click()
    }

    const generateQR = async () => {
        QRCode.toCanvas(document.getElementById('qrcode'), 
            id, 
            { 
                width: 250,
                margin: 2,
            }
        )
    }

    useEffect(() => {
        generateQR()
    }, [])

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Event Title</h1>
            </div>
            <div className={styles.qrcodecontainer}>
                <canvas id="qrcode"></canvas>
            </div>
            <div className={styles.button}>
                <button className={styles.buttonL} onClick={() => saveQR()}><h2>Save QR</h2></button>
            </div>
        </div>
    )
}