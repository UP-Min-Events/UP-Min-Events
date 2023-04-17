'use client'

import { useState, useEffect, useRef } from 'react';

export default function Scan() {
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef();

  const getVideoSources = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
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
    }
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
