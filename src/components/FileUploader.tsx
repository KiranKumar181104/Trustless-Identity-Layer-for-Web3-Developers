import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle, FileText, Image } from 'lucide-react';

interface FileUploaderProps {
  onUpload: (file: File, data: any) => void;
  onClose: () => void;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
}

export const FileUploader: React.FC<FileUploaderProps> = ({ 
  onUpload, 
  onClose, 
  acceptedTypes = ['application/json', 'image/*', 'text/plain'],
  maxSize = 10 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setError(null);
    
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate file type
    const isValidType = acceptedTypes.some(type => {
      if (type.includes('*')) {
        return file.type.startsWith(type.split('*')[0]);
      }
      return file.type === type;
    });

    if (!isValidType) {
      setError('File type not supported');
      return;
    }

    setUploadedFile(file);
    setProcessing(true);

    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let processedData;
      
      if (file.type === 'application/json') {
        const text = await file.text();
        processedData = {
          type: 'credential_json',
          data: JSON.parse(text),
          fileName: file.name,
          size: file.size,
          uploadDate: new Date().toISOString()
        };
      } else if (file.type.startsWith('image/')) {
        processedData = {
          type: 'credential_image',
          data: {
            id: 'cred_' + Math.random().toString(36).substr(2, 9),
            holder: 'did:web3:0x' + Math.random().toString(36).substr(2, 8),
            issuer: 'Document Scanner',
            title: 'Scanned Credential',
            issueDate: new Date().toISOString().split('T')[0],
            verified: false,
            requiresManualReview: true
          },
          fileName: file.name,
          size: file.size,
          uploadDate: new Date().toISOString()
        };
      } else {
        const text = await file.text();
        processedData = {
          type: 'text_document',
          data: {
            content: text,
            wordCount: text.split(/\s+/).length,
            lines: text.split('\n').length
          },
          fileName: file.name,
          size: file.size,
          uploadDate: new Date().toISOString()
        };
      }

      onUpload(file, processedData);
      setProcessing(false);
    } catch (err) {
      setError('Failed to process file');
      setProcessing(false);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type === 'application/json') return FileText;
    if (file.type.startsWith('image/')) return Image;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl max-w-lg w-full border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Upload Credential</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!uploadedFile ? (
            <div className="space-y-4">
              {/* Drop Zone */}
              <div
                className={`relative w-full h-48 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-white/20 hover:border-white/40 bg-black/20'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-center">
                  <Upload className={`h-12 w-12 mx-auto mb-4 ${dragActive ? 'text-blue-400' : 'text-gray-400'}`} />
                  <p className="text-white font-medium mb-2">
                    {dragActive ? 'Drop file here' : 'Drop files here or click to browse'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Supports JSON, images, and text files up to {maxSize}MB
                  </p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedTypes.join(',')}
                onChange={handleFileInput}
                className="hidden"
              />

              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              {/* Supported Formats */}
              <div className="space-y-2">
                <h3 className="text-white font-medium">Supported Formats:</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center space-x-2 p-2 bg-white/5 rounded">
                    <FileText className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-300">JSON</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-white/5 rounded">
                    <Image className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Images</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-white/5 rounded">
                    <File className="h-4 w-4 text-purple-400" />
                    <span className="text-gray-300">Text</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* File Processing */
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-black/20 rounded-lg">
                {React.createElement(getFileIcon(uploadedFile), { 
                  className: "h-8 w-8 text-blue-400" 
                })}
                <div className="flex-1">
                  <h3 className="text-white font-medium">{uploadedFile.name}</h3>
                  <p className="text-gray-400 text-sm">{formatFileSize(uploadedFile.size)}</p>
                </div>
                {processing ? (
                  <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                ) : (
                  <CheckCircle className="h-6 w-6 text-green-400" />
                )}
              </div>

              {processing && (
                <div className="text-center">
                  <p className="text-white mb-2">Processing file...</p>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}

              {!processing && (
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">File processed successfully!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};