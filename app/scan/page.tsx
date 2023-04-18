'use client'

import { useState, useEffect, useRef } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';

export default function Scan() {
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
    const videoRef = useRef<HTMLVideoElement>(null);
    const qrCodeReader = new BrowserQRCodeReader();

    const getVideoSources = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput')

        setVideoDevices(videoDevices);
        return videoDevices;
    };

    const getBackFacingVideoDeviceId = async () => {
        const videoDevices = await getVideoSources();
        for (const device of videoDevices) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: device.deviceId } });
            const trackSettings = stream.getVideoTracks()[0].getSettings();
            if (trackSettings.facingMode === 'environment') {
                return device.deviceId;
            }
        }
        return null;
    };

    useEffect(() => {
        getBackFacingVideoDeviceId().then(deviceId => {
            if (deviceId) {
                window.navigator.mediaDevices
                    .getUserMedia({ video: { deviceId  } })
                    .then(stream => {
                        setCameraStream(stream);
                    });
            }
        });
    }, []);

    useEffect(() => {
        if (cameraStream && videoRef.current) {
            videoRef.current.srcObject = cameraStream;

            // Start scanning QR code
            qrCodeReader.decodeFromVideoDevice(
                cameraStream.getVideoTracks()[0].getSettings().deviceId || null,
                videoRef.current,
                (result, error) => {
                    console.log('QR Code Result:', result);
                    // handle error if exists
                    if (error) {
                        console.error('QR Code Error:', error);
                    }
                }
            );

        }

        return () => {
            // Clean up on unmount
            qrCodeReader.reset();
        };
    }, [cameraStream]);

    return (
        <div>
            <h1>Scan</h1>
            {cameraStream && (
                <video autoPlay={true} ref={videoRef} style={{ width: '50%' }} />
            )}
        </div>
    );
}
