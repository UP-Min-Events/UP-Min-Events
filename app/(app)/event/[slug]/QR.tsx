'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'
import QRCode from 'qrcode'

import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebaseConfig'

interface Props {
    id: string,
}

export default function QR({ id } : Props) {
    
    const [name, setName] = useState<string>("")
    
    const getEventTitle = async () => {
        const docRef = doc(db, "events", id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            setName(docSnap.data().name)
        }
    }

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
            `upmin-events-git-staging-nbryleibanez.vercel.app/scan/${id}`, 
            { 
                width: 250,
                margin: 2,
            }
        )
    }

    useEffect(() => {
        generateQR()
        getEventTitle()
    }, [])

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>{name}</h1>
            </div>
            <div className={styles.qrcodecontainer}>
                <canvas id="qrcode"></canvas>
            </div>
            <div className={styles['small-button-wrapper']}>
                <button className={styles.buttonM} onClick={() => saveQR()}> Save QR </button>
            </div>
        </div>
    )
}