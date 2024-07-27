import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';
import styles from './QrReader.module.css';
import { addLoanService } from '../../services/loanServices';
import { toast } from 'sonner';
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

  async function buttonOnClick(copyId: string, studentId: string) {
    const response = await addLoanService(copyId, studentId);
    if (response === 201) {
      toast.success('Loan Added');
    }
  }

  return (
    <>
      {/*<video ref={videoElement} className={styles.qrReader} /> */}
      <button
        onClick={() =>
          buttonOnClick('afee3f27-c355-4e40-b02d-504ee8ec1114', 'S23017374')
        }
      >
        Add
      </button>
    </>
  );
}
