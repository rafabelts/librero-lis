import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';
import styles from './QrReader.module.css';
import { addLoanService, devolutionService } from '../../services/loanServices';
import { toast } from 'sonner';

export function BookQrReader() {
  const scanner = useRef<QrScanner>();
  const videoElement = useRef<HTMLVideoElement>(null);
  const [qrOn, setQrOn] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [copyId, setCopyId] = useState<string | undefined>();

  function onScanSuccess(result: QrScanner.ScanResult) {
    const resultData = JSON.parse(result?.data);
    if (resultData.copyId) {
      setCopyId(resultData.copyId);
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
      toast.error('Error. No se encontro la copia del libro');
    }
  }

  useEffect(() => {
    if (videoElement?.current && !scanner.current) {
      // Instantiate the QR Scanner
      scanner.current = new QrScanner(videoElement?.current, onScanSuccess, {
        //        onDecodeError: onScanFail,
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

  async function userButtonOnClick() {
    const user = JSON.parse(localStorage.getItem('user')!);
    const studentId = user.studentId;
    await addLoanService(copyId!, studentId);
  }

  async function adminButtonOnClick() {
    await devolutionService(copyId!);
  }

  const path = location.pathname;

  return (
    <>
      {/*     <video ref={videoElement} className={styles.qrReader} /> */}
      <button
        //        disabled={buttonDisabled}
        className="appButton"
        onClick={() => {
          path.includes('admin') ? adminButtonOnClick() : userButtonOnClick();
        }}
      >
        Add
      </button>
    </>
  );
}
