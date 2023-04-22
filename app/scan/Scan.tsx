'use client'

import { useState, useEffect, useRef } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';

export default function Scan(){

    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const qrCodeReader = new BrowserQRCodeReader();

    // const getVideoSources = async () => {
    //     const devices = await navigator.mediaDevices.enumerateDevices();
    //     console.log('Devices:', devices)
    //     let videoDevice = devices.find(device => device.kind === 'videoinput' && (device as any).facingMode?.ideal === 'environment')
    //     if (!videoDevice) videoDevice = devices.find(device => device.kind === 'videoinput')

    //     return videoDevice?.deviceId;
    // }

    // useEffect(() => {
    //     getVideoSources().then(deviceId => {
    //         if (deviceId) {
    //             window.navigator.mediaDevices.getUserMedia({ video: { deviceId: deviceId } }).then(stream => {
    //                 setCameraStream(stream);
    //                 setIsCameraReady(true);
    //             }).catch(error => {
    //                 console.error('Camera Error:', error);
    //             });
    //         }
    //     })
    // }, []);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: { exact: 'environment'}
            }}).then(stream => {
            
            setCameraStream(stream);
            setIsCameraReady(true);
        }).catch(error => {
            console.error('Camera Error:', error);
        });
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
                        window.alert(result.getText());
                    }
                }
            );

        }

        return () => {
            // Clean up on unmount
            qrCodeReader.reset();
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