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
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    setVideoDevices(videoDevices);
    return videoDevices;
  };

  useEffect(() => {
    getVideoSources().then(videoDevices => {
      if (videoDevices.length > 0) {
        window.navigator.mediaDevices
          .getUserMedia({ video: { deviceId: videoDevices[0].deviceId } })
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
