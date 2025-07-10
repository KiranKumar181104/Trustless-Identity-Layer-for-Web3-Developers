import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, AlertCircle, Scan, Upload, Download, Eye } from 'lucide-react';
import { QRScanner } from './QRScanner';
import { FileUploader } from './FileUploader';

export const CredentialVerifier: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCredential, setSelectedCredential] = useState<any>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showFileUploader, setShowFileUploader] = useState(false);

  const mockCredentials = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      holder: 'did:web3:0x1234...5678',
      issuer: 'TechCorp Inc.',
      issueDate: '2024-01-15',
      expiryDate: '2025-01-15',
      status: 'verified',
      zkProof: true,
      ipfsHash: 'QmX7Y8Z...',
      verifications: 156,
      trustScore: 95
    },
    {
      id: 2,
      title: 'Blockchain Developer Certification',
      holder: 'did:web3:0x9876...4321',
      issuer: 'Web3 Academy',
      issueDate: '2024-01-10',
      expiryDate: '2025-01-10',
      status: 'verified',
      zkProof: true,
      ipfsHash: 'QmA8B9C...',
      verifications: 89,
      trustScore: 92
    },
    {
      id: 3,
      title: 'Smart Contract Auditor',
      holder: 'did:web3:0x5555...7777',
      issuer: 'Security Labs',
      issueDate: '2024-01-05',
      expiryDate: '2025-01-05',
      status: 'revoked',
      zkProof: false,
      ipfsHash: 'QmD4E5F...',
      verifications: 23,
      trustScore: 78
    }
  ];

  const handleVerify = (credential: any) => {
    setSelectedCredential(credential);
    // Simulate verification process
    setTimeout(() => {
      setVerificationResult({
        isValid: credential.status === 'verified',
        zkProofValid: credential.zkProof,
        ipfsVerified: true,
        issuerTrusted: true,
        notRevoked: credential.status !== 'revoked',
        timestamp: new Date().toISOString()
      });
    }, 1000);
  };

  const handleQRScan = (data: string) => {
    try {
      const parsedData = JSON.parse(data);
      // Add scanned credential to the list
      const newCredential = {
        id: Date.now(),
        title: parsedData.title || 'Scanned Credential',
        holder: parsedData.holder || 'Unknown',
        issuer: parsedData.issuer || 'Unknown',
        issueDate: parsedData.issueDate || new Date().toISOString().split('T')[0],
        expiryDate: parsedData.expiryDate || '2025-12-31',
        status: parsedData.verified ? 'verified' : 'pending',
        zkProof: parsedData.zkProof || false,
        ipfsHash: 'QmScanned...',
        verifications: 0,
        trustScore: parsedData.verified ? 85 : 50
      };
      
      // In a real app, you'd add this to your state management
      console.log('Scanned credential:', newCredential);
      setShowQRScanner(false);
    } catch (error) {
      console.error('Failed to parse QR data:', error);
    }
  };

  const handleFileUpload = (file: File, processedData: any) => {
    console.log('Uploaded file:', file.name);
    console.log('Processed data:', processedData);
    
    // In a real app, you'd process the uploaded credential
    setShowFileUploader(false);
  };

  const filteredCredentials = mockCredentials.filter(credential =>
    credential.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    credential.holder.toLowerCase().includes(searchQuery.toLowerCase()) ||
    credential.issuer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Credential Verifier</h1>
          <p className="text-gray-300">Verify the authenticity of credentials and professional qualifications</p>
        </div>

        {/* Search and Upload */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by credential title, holder DID, or issuer..."
              className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm text-white rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowQRScanner(true)}
              className="flex items-center space-x-2 px-4 py-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
            >
              <Scan className="h-5 w-5" />
              <span>QR Scan</span>
            </button>
            <button 
              onClick={() => setShowFileUploader(true)}
              className="flex items-center space-x-2 px-4 py-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
            >
              <Upload className="h-5 w-5" />
              <span>Upload</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Credentials List */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6">Available Credentials</h2>
              <div className="space-y-4">
                {filteredCredentials.map((credential) => (
                  <div
                    key={credential.id}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          credential.status === 'verified' ? 'bg-green-500/20' : 
                          credential.status === 'revoked' ? 'bg-red-500/20' : 'bg-yellow-500/20'
                        }`}>
                          {credential.status === 'verified' ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : credential.status === 'revoked' ? (
                            <XCircle className="h-5 w-5 text-red-400" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-yellow-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{credential.title}</h3>
                          <p className="text-sm text-gray-300">{credential.issuer}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          credential.status === 'verified' ? 'bg-green-500/20 text-green-400' : 
                          credential.status === 'revoked' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {credential.status}
                        </span>
                        {credential.zkProof && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                            ZK
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-400">Holder:</span>
                        <p className="text-white font-mono">{credential.holder}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Trust Score:</span>
                        <p className="text-white font-bold">{credential.trustScore}%</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Issue Date:</span>
                        <p className="text-white">{credential.issueDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Verifications:</span>
                        <p className="text-white">{credential.verifications}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <span>IPFS:</span>
                        <code className="font-mono">{credential.ipfsHash}</code>
                      </div>
                      <button
                        onClick={() => handleVerify(credential)}
                        className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Verify</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verification Results */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">Verification Results</h2>
              {selectedCredential && verificationResult ? (
                <div className="space-y-4">
                  <div className="p-4 bg-black/20 rounded-lg">
                    <h3 className="font-semibold text-white mb-2">{selectedCredential.title}</h3>
                    <p className="text-sm text-gray-300">{selectedCredential.issuer}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Credential Valid</span>
                      {verificationResult.isValid ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">ZK Proof Valid</span>
                      {verificationResult.zkProofValid ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">IPFS Verified</span>
                      {verificationResult.ipfsVerified ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Issuer Trusted</span>
                      {verificationResult.issuerTrusted ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Not Revoked</span>
                      {verificationResult.notRevoked ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="text-xs text-gray-400">
                      Verified at: {new Date(verificationResult.timestamp).toLocaleString()}
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center space-x-2 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Download Report</span>
                  </button>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  Select a credential to verify its authenticity
                </p>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">Verification Tips</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Always verify ZK proofs for privacy-preserving credentials</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Check IPFS hash for tamper-proof storage</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Verify issuer reputation and trust score</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Confirm credential has not been revoked</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showQRScanner && (
          <QRScanner 
            onScan={handleQRScan}
            onClose={() => setShowQRScanner(false)}
          />
        )}
        
        {showFileUploader && (
          <FileUploader
            onUpload={handleFileUpload}
            onClose={() => setShowFileUploader(false)}
          />
        )}
      </div>
    </div>
  );
};