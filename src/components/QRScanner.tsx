import React, { useState, useRef } from 'react';
import { Camera, Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startScanning = () => {
    setIsScanning(true);
    // Simulate QR scanning process
    setTimeout(() => {
      const mockQRData = {
        type: 'credential',
        id: 'cred_' + Math.random().toString(36).substr(2, 9),
        holder: 'did:web3:0x' + Math.random().toString(36).substr(2, 8),
        issuer: 'TechCorp Inc.',
        title: 'Senior Software Engineer',
        issueDate: new Date().toISOString().split('T')[0],
        verified: true
      };
      
      const qrDataString = JSON.stringify(mockQRData, null, 2);
      setScanResult(qrDataString);
      setIsScanning(false);
      onScan(qrDataString);
    }, 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      
      // Simulate QR code extraction from image
      setTimeout(() => {
        const mockQRData = {
          type: 'credential',
          id: 'cred_' + Math.random().toString(36).substr(2, 9),
          holder: 'did:web3:0x' + Math.random().toString(36).substr(2, 8),
          issuer: 'Web3 Academy',
          title: 'Blockchain Developer Certification',
          issueDate: new Date().toISOString().split('T')[0],
          verified: true,
          source: 'uploaded_image'
        };
        
        const qrDataString = JSON.stringify(mockQRData, null, 2);
        setScanResult(qrDataString);
        onScan(qrDataString);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl max-w-lg w-full border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">QR Code Scanner</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!scanResult ? (
            <div className="space-y-6">
              {/* Camera Scanner */}
              <div className="text-center">
                <div className="relative mx-auto w-64 h-64 bg-black/20 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center mb-4">
                  {isScanning ? (
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white">Scanning for QR code...</p>
                      <div className="absolute inset-4 border-2 border-blue-500/50 rounded-lg animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300">Position QR code in frame</p>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={startScanning}
                  disabled={isScanning}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors disabled:opacity-50"
                >
                  <Camera className="h-5 w-5" />
                  <span>{isScanning ? 'Scanning...' : 'Start Camera Scan'}</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-900 text-gray-400">Or</span>
                </div>
              </div>

              {/* File Upload */}
              <div className="text-center">
                <div 
                  className="relative mx-auto w-full h-32 bg-black/20 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center mb-4 cursor-pointer hover:border-purple-500/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadedFile ? (
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <p className="text-white text-sm">{uploadedFile.name}</p>
                      <p className="text-gray-400 text-xs">Processing...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-300">Upload QR code image</p>
                      <p className="text-gray-400 text-sm">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                >
                  <Upload className="h-5 w-5" />
                  <span>Choose File</span>
                </button>
              </div>
            </div>
          ) : (
            /* Scan Result */
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">QR Code Detected!</span>
              </div>
              
              <div className="p-4 bg-black/20 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Scanned Data:</h3>
                <pre className="text-sm text-gray-300 overflow-auto max-h-40">
                  {scanResult}
                </pre>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setScanResult(null);
                    setUploadedFile(null);
                  }}
                  className="flex-1 py-2 px-4 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
                >
                  Scan Another
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};