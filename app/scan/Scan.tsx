'use client'

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { BrowserQRCodeReader } from '@zxing/library';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc} from 'firebase/firestore';

export default function Scan(){

    const user = auth.currentUser

    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const qrCodeReader = new BrowserQRCodeReader();

    const router = useRouter()

    const processAttendance = async (eventId) => {

        const attendee = user.displayName
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
        }).catch(error => {
            navigator.mediaDevices.getUserMedia({
                video: true
            }).then(stream => {
                    setCameraStream(stream);
                    setIsCameraReady(true);
                }).catch(error => {
                    console.error('Camera Error:', error);
                }
            )
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

            // Start scanning QR code
            qrCodeReader.decodeFromVideoDevice(
                cameraStream.getVideoTracks()[0].getSettings().deviceId || null,
                videoRef.current,
                (result, error) => {
                    if (result) {
                        processAttendance(result.getText());
                    }
                }
            );

        }

        console.log("Camera Stream Check: ", cameraStream)

        return () => {
            // Clean up on unmount
            qrCodeReader.reset();
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [cameraStream, isCameraReady]);

    return (
        <div>
            <h1>Scan</h1>
            {cameraStream && (
                <video autoPlay={true} ref={videoRef} style={{ width: '50%' }} />
            )}
        </div>
    )
}