
import React, { useRef, useEffect, useState } from 'react';

interface ScannerProps {
  onScan: (data: string) => void;
  onCancel: () => void;
  retailerName: string;
}

const Scanner: React.FC<ScannerProps> = ({ onScan, onCancel, retailerName }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        console.error("Camera error:", err);
        setHasPermission(false);
      }
    }

    startCamera();

    // Simulation: Auto-detect scan after 3 seconds for demo purposes
    const timer = setTimeout(() => {
      setScanning(false);
      onScan("TXN_MOCK_123456");
    }, 4000);

    return () => {
      clearTimeout(timer);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-md aspect-square bg-gray-900 rounded-3xl overflow-hidden border-2 border-white/20">
        {hasPermission === false && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
            <div>
              <p className="mb-4">Camera access is required to scan QR codes.</p>
              <button 
                onClick={onCancel}
                className="bg-white text-black px-6 py-2 rounded-full font-bold"
              >
                Go Back
              </button>
            </div>
          </div>
        )}

        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-white rounded-2xl relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 -mt-1 -ml-1 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 -mt-1 -mr-1 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 -mb-1 -ml-1 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 -mb-1 -mr-1 rounded-br-lg"></div>
            
            {scanning && (
              <div className="absolute left-0 top-0 w-full h-1 bg-blue-500/50 shadow-[0_0_15px_blue] animate-scan-line"></div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Scanning for {retailerName}</h2>
        <p className="text-white/60">Align the QR code inside the frame</p>
      </div>

      <button 
        onClick={onCancel}
        className="mt-12 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <style>{`
        @keyframes scan-line {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan-line {
          animation: scan-line 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Scanner;
