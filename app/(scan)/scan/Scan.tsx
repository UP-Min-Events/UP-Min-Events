'use client'

import styles from './page.module.scss'
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'

import { BrowserQRCodeReader } from '@zxing/library';

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'    

export default function Scan(){

    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const qrCodeReader = new BrowserQRCodeReader();

    const router = useRouter()

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
                        const res = result.getText()
                        const path = res.substring(res.indexOf('/'))
                        router.push(`${path}`)
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