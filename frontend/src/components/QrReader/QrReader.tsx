import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';
import styles from './QrReader.module.css';
import { addLoanService, devolutionService } from '../../services/loanServices';
import { toast } from 'sonner';
import { useAppContext } from '../../context/ctxt';
export function BookQrReader() {
  const scanner = useRef<QrScanner>();
  const videoElement = useRef<HTMLVideoElement>(null);
  const [qrOn, setQrOn] = useState(true);
  const ctxt = useAppContext();

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

  async function userButtonOnClick(copyId: string, studentId: string) {
    const response = await addLoanService(copyId, studentId);
    if (response === 201) {
      window.location.href = '/';
    }
  }

  async function adminButtonOnClick(copyId: string) {
    const response = await devolutionService(copyId);
    if (response === 201) {
      toast.success('Loan Added');
    }
  }

  const path = location.pathname;

  return (
    <>
      {/*<video ref={videoElement} className={styles.qrReader} /> */}
      <button
        onClick={() => {
          path.includes('admin')
            ? adminButtonOnClick('00440f0e-1e89-44d1-9c23-45554fafe8fc')
            : userButtonOnClick(
                '00440f0e-1e89-44d1-9c23-45554fafe8fc',
                ctxt?.user?.studentId as string
              );
        }}
      >
        Add
      </button>
    </>
  );
}
