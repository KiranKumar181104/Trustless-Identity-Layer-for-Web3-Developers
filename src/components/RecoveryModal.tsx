import React, { useState } from 'react';
import { X, Key, Shield, Users, Download, Copy, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

interface RecoveryModalProps {
  identity: any;
  onClose: () => void;
}

export const RecoveryModal: React.FC<RecoveryModalProps> = ({ identity, onClose }) => {
  const [activeTab, setActiveTab] = useState('seed');
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [seedPhraseConfirmed, setSeedPhraseConfirmed] = useState(false);
  const [guardians, setGuardians] = useState([
    { address: 'did:web3:0x1234...5678', name: 'Alice (Trusted Friend)', status: 'confirmed' },
    { address: 'did:web3:0x9876...4321', name: 'Bob (Colleague)', status: 'pending' },
    { address: 'did:web3:0x5555...7777', name: 'Carol (Family)', status: 'confirmed' }
  ]);
  const [newGuardian, setNewGuardian] = useState('');

  const seedPhrase = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

  const downloadRecoveryKit = () => {
    const recoveryData = {
      identity: identity.name,
      did: identity.did,
      seedPhrase: showSeedPhrase ? seedPhrase : '[HIDDEN]',
      guardians: guardians.filter(g => g.status === 'confirmed'),
      created: new Date().toISOString(),
      instructions: "Store this recovery kit in a secure location. You will need it to recover your identity if you lose access to your primary device."
    };

    const blob = new Blob([JSON.stringify(recoveryData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${identity.name.replace(/\s+/g, '_')}_recovery_kit.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const addGuardian = () => {
    if (!newGuardian.trim()) return;
    
    const guardian = {
      address: newGuardian,
      name: 'New Guardian',
      status: 'pending'
    };
    
    setGuardians([...guardians, guardian]);
    setNewGuardian('');
  };

  const removeGuardian = (index: number) => {
    setGuardians(guardians.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl max-w-2xl w-full border border-white/10 shadow-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Recovery Options</h2>
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

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          {[
            { id: 'seed', label: 'Seed Phrase', icon: Key },
            { id: 'social', label: 'Social Recovery', icon: Users },
            { id: 'multisig', label: 'Multi-sig', icon: Shield }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                activeTab === id
                  ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-500/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Seed Phrase Tab */}
          {activeTab === 'seed' && (
            <div className="space-y-6">
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Important Security Notice</span>
                </div>
                <p className="text-yellow-300 text-sm">
                  Your seed phrase is the master key to your identity. Never share it with anyone and store it securely offline.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Recovery Seed Phrase</h3>
                  <button
                    onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                    className="flex items-center space-x-2 px-3 py-1 bg-gray-500/20 text-gray-300 rounded hover:bg-gray-500/30 transition-colors"
                  >
                    {showSeedPhrase ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span>{showSeedPhrase ? 'Hide' : 'Show'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {seedPhrase.split(' ').map((word, index) => (
                    <div key={index} className="p-3 bg-black/20 rounded-lg text-center">
                      <span className="text-xs text-gray-400 block">{index + 1}</span>
                      <span className="text-white font-mono">
                        {showSeedPhrase ? word : '•••••'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="seedConfirm"
                    checked={seedPhraseConfirmed}
                    onChange={(e) => setSeedPhraseConfirmed(e.target.checked)}
                    className="w-4 h-4 text-blue-500 bg-black/20 border-white/10 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="seedConfirm" className="text-sm text-gray-300">
                    I have safely stored my seed phrase in a secure location
                  </label>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(seedPhrase)}
                    disabled={!showSeedPhrase}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors disabled:opacity-50"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy Phrase</span>
                  </button>
                  <button
                    onClick={downloadRecoveryKit}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Kit</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Social Recovery Tab */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Trusted Guardians</h3>
                <p className="text-gray-300 text-sm">
                  Add trusted contacts who can help you recover your identity. You'll need approval from at least 2 guardians to recover your account.
                </p>

                <div className="space-y-3">
                  {guardians.map((guardian, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          guardian.status === 'confirmed' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                        }`}>
                          {guardian.status === 'confirmed' ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{guardian.name}</p>
                          <p className="text-gray-400 text-sm font-mono">{guardian.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          guardian.status === 'confirmed' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {guardian.status}
                        </span>
                        <button
                          onClick={() => removeGuardian(index)}
                          className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newGuardian}
                    onChange={(e) => setNewGuardian(e.target.value)}
                    placeholder="Enter guardian DID or address"
                    className="flex-1 p-3 bg-black/20 text-white rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={addGuardian}
                    className="px-4 py-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Multi-sig Tab */}
          {activeTab === 'multisig' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Multi-signature Recovery</h3>
                <p className="text-gray-300 text-sm">
                  Set up a multi-signature wallet for enhanced security. Requires multiple signatures to authorize recovery operations.
                </p>

                <div className="p-4 bg-black/20 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Current Configuration</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Required Signatures:</span>
                      <span className="text-white">2 of 3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Wallet Address:</span>
                      <span className="text-blue-400 font-mono">0x1234...5678</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400">Active</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Signers</h4>
                  {[
                    { address: '0x1234...5678', role: 'Primary (You)', status: 'active' },
                    { address: '0x9876...4321', role: 'Recovery Key 1', status: 'active' },
                    { address: '0x5555...7777', role: 'Recovery Key 2', status: 'active' }
                  ].map((signer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{signer.role}</p>
                        <p className="text-gray-400 text-sm font-mono">{signer.address}</p>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                        {signer.status}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
                  Configure Multi-sig Wallet
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
            >
              Close
            </button>
            <button
              onClick={downloadRecoveryKit}
              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
            >
              Download Recovery Kit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};