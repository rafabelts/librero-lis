import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';
import styles from './QrReader.module.css';
export function BookQrReader() {
  const scanner = useRef<QrScanner>();
  const videoElement = useRef<HTMLVideoElement>(null);
  const [qrOn, setQrOn] = useState(true);

  function onScanSuccess() {
    console.log('Success');
  }

  function onScanFail() {
    console.log('Error');
  }

  useEffect(() => {
    if (videoElement?.current && !scanner.current) {
      // Instantiate the QR Scanner
      scanner.current = new QrScanner(videoElement?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // "environment" -> back camera and "user" -> front camera
        preferredCamera: 'environment',
        // Helps position a "QrFrame.svg"
        // highlightScanRegion: true,
        // // Produce a yellow outline around the qr code
        highlightCodeOutline: true,
        // Give full control over scann area
        // overlay: qrBoxElement?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // Removes Qr Scanner from rendering and using camera when its closed or removed from the UI
    return () => {
      if (!videoElement?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn) {
      alert('Camara no detectada');
    }
  }, [qrOn]);

  return (
    <>
      <video ref={videoElement} className={styles.qrReader} />
      <button> Add </button>
    </>
  );
}
