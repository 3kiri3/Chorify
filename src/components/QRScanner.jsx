import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

export default function QRScanner({ onScan, onClose }) {
  const scannerRef = useRef(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode('qr-reader');
    scannerRef.current = html5QrCode;

    html5QrCode.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        html5QrCode.stop().then(() => {
          onScan(decodedText);
        });
      },
      () => {}
    ).catch(() => {
      console.error('Camera not available');
    });

    return () => {
      html5QrCode.stop().catch(() => {});
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <div id="qr-reader" className="w-72 h-72 rounded-3xl overflow-hidden" />
      <button
        onClick={onClose}
        className="px-6 py-3 rounded-2xl border-2 border-[#B5CF50] text-[#B5CF50] font-semibold hover:bg-[#B5CF50]/10 transition-all duration-300"
      >
        cancel
      </button>
    </div>
  );
}