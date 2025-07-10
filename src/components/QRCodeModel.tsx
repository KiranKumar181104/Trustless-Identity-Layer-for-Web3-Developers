import React, { useEffect, useRef } from 'react';
import { X, Download, Copy, QrCode } from 'lucide-react';

interface QRCodeModalProps {
  data: string;
  title: string;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ data, title, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateQRCode();
  }, [data]);

  const generateQRCode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 300;
    canvas.height = 300;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 300, 300);

    // Generate a simple QR-like pattern (for demo purposes)
    // In a real implementation, you'd use a QR code library
    const size = 300;
    const modules = 25;
    const moduleSize = size / modules;

    ctx.fillStyle = '#000000';

    // Create a pattern based on the data
    const hash = data.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);

    for (let i = 0; i < modules; i++) {
      for (let j = 0; j < modules; j++) {
        const shouldFill = ((hash + i * j) % 3) === 0;
        if (shouldFill) {
          ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
        }
      }
    }

    // Add corner markers
    const markerSize = moduleSize * 7;
    ctx.fillStyle = '#000000';
    
    // Top-left marker
    ctx.fillRect(0, 0, markerSize, markerSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(moduleSize, moduleSize, markerSize - 2 * moduleSize, markerSize - 2 * moduleSize);
    ctx.fillStyle = '#000000';
    ctx.fillRect(2 * moduleSize, 2 * moduleSize, markerSize - 4 * moduleSize, markerSize - 4 * moduleSize);

    // Top-right marker
    ctx.fillStyle = '#000000';
    ctx.fillRect(size - markerSize, 0, markerSize, markerSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(size - markerSize + moduleSize, moduleSize, markerSize - 2 * moduleSize, markerSize - 2 * moduleSize);
    ctx.fillStyle = '#000000';
    ctx.fillRect(size - markerSize + 2 * moduleSize, 2 * moduleSize, markerSize - 4 * moduleSize, markerSize - 4 * moduleSize);

    // Bottom-left marker
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, size - markerSize, markerSize, markerSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(moduleSize, size - markerSize + moduleSize, markerSize - 2 * moduleSize, markerSize - 2 * moduleSize);
    ctx.fillStyle = '#000000';
    ctx.fillRect(2 * moduleSize, size - markerSize + 2 * moduleSize, markerSize - 4 * moduleSize, markerSize - 4 * moduleSize);
  };

  const downloadQR = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${title.replace(/\s+/g, '_').toLowerCase()}_qr.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const copyData = () => {
    navigator.clipboard.writeText(data);
    // You could add a toast notification here
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl max-w-md w-full border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <QrCode className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="bg-white p-4 rounded-xl mb-6 inline-block">
            <canvas
              ref={canvasRef}
              className="block"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-black/20 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Data:</p>
              <code className="text-blue-400 text-xs font-mono break-all">{data}</code>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={copyData}
                className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
              >
                <Copy className="h-4 w-4" />
                <span>Copy Data</span>
              </button>
              <button
                onClick={downloadQR}
                className="flex-1 flex items-center justify-center space-x-2 py-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};