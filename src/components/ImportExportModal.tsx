import React, { useState, useRef } from 'react';
import { X, Download, Upload, FileText, Key, Shield, AlertCircle, CheckCircle } from 'lucide-react';

interface ImportExportModalProps {
  type: 'import' | 'export';
  identity: any;
  onClose: () => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({ type, identity, onClose }) => {
  const [exportFormat, setExportFormat] = useState('json');
  const [includePrivateKey, setIncludePrivateKey] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPassword, setImportPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    if (includePrivateKey && (!password || password !== confirmPassword)) {
      return;
    }

    setProcessing(true);

    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const exportData = {
      version: '1.0',
      type: 'trustlayer_identity',
      identity: {
        name: identity.name,
        did: identity.did,
        type: identity.type,
        created: identity.created,
        publicKey: '0x04a1b2c3d4e5f6...',
        ...(includePrivateKey && {
          privateKey: password ? 'encrypted_private_key_data' : '0x1234567890abcdef...',
          encrypted: !!password
        })
      },
      credentials: [
        {
          id: 'cred_1',
          title: 'Professional Certification',
          issuer: 'TechCorp Inc.',
          status: 'verified'
        }
      ],
      metadata: {
        exportedAt: new Date().toISOString(),
        exportedBy: 'TrustLayer Platform'
      }
    };

    let content: string;
    let filename: string;
    let mimeType: string;

    switch (exportFormat) {
      case 'json':
        content = JSON.stringify(exportData, null, 2);
        filename = `${identity.name.replace(/\s+/g, '_')}_identity.json`;
        mimeType = 'application/json';
        break;
      case 'pem':
        content = `-----BEGIN TRUSTLAYER IDENTITY-----
${btoa(JSON.stringify(exportData))}
-----END TRUSTLAYER IDENTITY-----`;
        filename = `${identity.name.replace(/\s+/g, '_')}_identity.pem`;
        mimeType = 'application/x-pem-file';
        break;
      case 'backup':
        content = JSON.stringify({
          ...exportData,
          recoveryInstructions: "This is a complete backup of your TrustLayer identity. Store it securely and use it to restore your identity if needed."
        }, null, 2);
        filename = `${identity.name.replace(/\s+/g, '_')}_backup.json`;
        mimeType = 'application/json';
        break;
      default:
        content = JSON.stringify(exportData, null, 2);
        filename = `${identity.name.replace(/\s+/g, '_')}_identity.json`;
        mimeType = 'application/json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);

    setProcessing(false);
    setSuccess(true);
    
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleImport = async () => {
    if (!importFile) return;

    setProcessing(true);

    // Simulate import process
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const content = await importFile.text();
      const importedData = JSON.parse(content);
      
      // Validate the imported data
      if (!importedData.identity || !importedData.identity.did) {
        throw new Error('Invalid identity file format');
      }

      console.log('Imported identity:', importedData);
      setSuccess(true);
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Import failed:', error);
    }

    setProcessing(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImportFile(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl max-w-lg w-full border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              type === 'export' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                : 'bg-gradient-to-r from-green-500 to-blue-500'
            }`}>
              {type === 'export' ? (
                <Download className="h-5 w-5 text-white" />
              ) : (
                <Upload className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {type === 'export' ? 'Export Identity' : 'Import Identity'}
              </h2>
              <p className="text-sm text-gray-400">{identity.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {type === 'export' ? 'Export Successful!' : 'Import Successful!'}
              </h3>
              <p className="text-gray-300">
                {type === 'export' 
                  ? 'Your identity has been exported successfully.' 
                  : 'Your identity has been imported successfully.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {type === 'export' ? (
                /* Export Form */
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Export Format
                    </label>
                    <select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="w-full p-3 bg-black/20 text-white rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="json">JSON Format</option>
                      <option value="pem">PEM Format</option>
                      <option value="backup">Complete Backup</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="includePrivateKey"
                      checked={includePrivateKey}
                      onChange={(e) => setIncludePrivateKey(e.target.checked)}
                      className="w-4 h-4 text-blue-500 bg-black/20 border-white/10 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="includePrivateKey" className="text-sm text-gray-300">
                      Include private key (requires password protection)
                    </label>
                  </div>

                  {includePrivateKey && (
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-yellow-400" />
                          <span className="text-yellow-400 text-sm font-medium">Security Warning</span>
                        </div>
                        <p className="text-yellow-300 text-xs mt-1">
                          Exporting private keys is risky. Use a strong password and store the file securely.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Encryption Password
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full p-3 bg-black/20 text-white rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                          placeholder="Enter strong password"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full p-3 bg-black/20 text-white rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                          placeholder="Confirm password"
                        />
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-black/20 rounded-lg">
                    <h4 className="font-semibold text-white mb-2 flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>Export Contents</span>
                    </h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Identity metadata and DID</li>
                      <li>• Public key and verification methods</li>
                      <li>• Associated credentials</li>
                      {includePrivateKey && <li>• Private key (encrypted)</li>}
                    </ul>
                  </div>
                </div>
              ) : (
                /* Import Form */
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Select Identity File
                    </label>
                    <div 
                      className="w-full h-32 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {importFile ? (
                        <div className="text-center">
                          <FileText className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                          <p className="text-white font-medium">{importFile.name}</p>
                          <p className="text-gray-400 text-sm">{(importFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-300">Click to select identity file</p>
                          <p className="text-gray-400 text-sm">JSON, PEM, or backup files</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json,.pem,.backup"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Decryption Password (if required)
                    </label>
                    <input
                      type="password"
                      value={importPassword}
                      onChange={(e) => setImportPassword(e.target.value)}
                      className="w-full p-3 bg-black/20 text-white rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                      placeholder="Enter password if file is encrypted"
                    />
                  </div>

                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-400 text-sm font-medium">Import Safety</span>
                    </div>
                    <p className="text-blue-300 text-xs mt-1">
                      Only import identity files from trusted sources. Importing will merge with your existing identity data.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className="p-6 border-t border-white/10">
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={type === 'export' ? handleExport : handleImport}
                disabled={processing || (type === 'import' && !importFile) || (type === 'export' && includePrivateKey && (!password || password !== confirmPassword))}
                className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{type === 'export' ? 'Exporting...' : 'Importing...'}</span>
                  </>
                ) : (
                  <>
                    {type === 'export' ? (
                      <Download className="h-4 w-4" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                    <span>{type === 'export' ? 'Export' : 'Import'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};