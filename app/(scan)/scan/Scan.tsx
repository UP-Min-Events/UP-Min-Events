'use client'

import styles from './page.module.scss'
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'

import { BrowserQRCodeReader } from '@zxing/library';
import { auth, db } from '../../../firebaseConfig';
import { doc, getDoc, updateDoc} from 'firebase/firestore';

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
            )
        }

        return () => {
            qrCodeReader.reset();
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
            }
        }

    }, [cameraStream, isCameraReady]);

    return (
        <>
            <div className={styles['content-wrapper']}>
                <div className={styles.nav}>
                    <Link href="/">
                        <ArrowBackIcon sx={{scale: '150%', p: '0'}} /> 
                    </Link>
                </div>
                <div className={styles['header-wrapper']}>
                    <h1>Scan a QR Code</h1>
                    <p>Log your attendance.</p>
                </div>
            </div>
            <div className={styles['video-wrapper']}>
                {cameraStream && <video autoPlay={true} ref={videoRef} />}
            </div>
        </>
    )
}