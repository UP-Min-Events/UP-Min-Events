'use client'

import styles from './page.module.css'
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { BrowserQRCodeReader } from '@zxing/library';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc} from 'firebase/firestore';

import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'    

export default function Scan(){

    const user = auth.currentUser

    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const qrCodeReader = new BrowserQRCodeReader();

    const router = useRouter()

    const processAttendance = async (eventId: string) => {

        const attendee = user?.uid
        const eventRef = doc(db, 'events', eventId)
        const eventDoc = await getDoc(eventRef)

        if (eventDoc.exists()) {
            const attendees = eventDoc.data().attendees

            if (attendees.includes(attendee)) {
                window.alert('You are already attending this event!')
                return
            }

            attendees.push(attendee)

            await updateDoc(eventRef, {
                attendees: attendees
            })

            window.alert('Attendance recorded!')

            router.push(`/event/${eventId}`)
        } else {
            window.alert('No such event!')
        }
    }

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: { exact: 'environment'}
            }}).then(stream => {
            
            setCameraStream(stream);
            setIsCameraReady(true);
        }).catch(() => {
            navigator.mediaDevices.getUserMedia({
                video: true
            }).then(stream => {
                setCameraStream(stream);
                setIsCameraReady(true);
            })
        });

        return () => {
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
            }
        }

    }, []);

    useEffect(() => {
        if (cameraStream && videoRef.current && isCameraReady) {
            videoRef.current.srcObject = cameraStream;

            qrCodeReader.decodeFromVideoDevice(
                cameraStream.getVideoTracks()[0].getSettings().deviceId || null,
                videoRef.current,
                (result) => {
                    if (result) {
                        processAttendance(result.getText());
                    }
                }
            );

        }

        return () => {
            qrCodeReader.reset();
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [cameraStream, isCameraReady]);

    return (
        <div className={styles.container}>                  
            <div className={styles.nav}>
                <IconButton size="large"
                    sx={{
                        scale: '1.4',
                        left: '0',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '0',
                        mb: '1em',
                    }}> 
                    <Link href="/">
                        <ArrowBackIcon /> 
                    </Link>
                </IconButton> 
            </div>

            <div id={styles.scanBody}>
                <h1>Scan a QR Code</h1>
                <h5>Log your attendance.</h5>
                
                <div id={styles.videoContainer}>
                    {cameraStream && (
                        <video autoPlay={true} ref={videoRef} />
                    )}
                    <h5>Position carefully. </h5>
                </div>
            </div>

        </div>
    )
}