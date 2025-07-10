import React, { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Key,
  Shield,
  Download,
  Upload,
  QrCode,
} from "lucide-react";
import { QRCodeModal } from "./QRCodeModel";
import { RecoveryModal } from "./RecoveryModal";
import { ImportExportModal } from "./ImportExportModal";

interface IdentityManagerProps {
  isConnected: boolean;
}

export const IdentityManager: React.FC<IdentityManagerProps> = ({
  isConnected,
}) => {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [activeIdentity, setActiveIdentity] = useState(0);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [showImportExportModal, setShowImportExportModal] = useState(false);
  const [importExportType, setImportExportType] = useState<"import" | "export">(
    "export"
  );

  const identities = [
    {
      id: 1,
      name: "Professional Identity",
      did: "did:web3:0x1234...5678",
      type: "Professional",
      status: "Active",
      created: "2024-01-15",
      credentials: 8,
      verifications: 12,
    },
    {
      id: 2,
      name: "Developer Identity",
      did: "did:web3:0x9876...4321",
      type: "Developer",
      status: "Active",
      created: "2024-01-10",
      credentials: 5,
      verifications: 8,
    },
    {
      id: 3,
      name: "Academic Identity",
      did: "did:web3:0x5555...7777",
      type: "Academic",
      status: "Inactive",
      created: "2024-01-05",
      credentials: 3,
      verifications: 4,
    },
  ];

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newIdentity, setNewIdentity] = useState({
    name: "",
    type: "Professional",
    description: "",
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Connect Your Wallet</h2>
          <p className="text-gray-300 max-w-md">
            Please connect your Web3 wallet to access identity management
            features.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Identity Manager
            </h1>
            <p className="text-gray-300">
              Create and manage your decentralized identities
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>Create Identity</span>
          </button>
        </div>

        {/* Identity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Identity List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {identities.map((identity, index) => (
                <div
                  key={identity.id}
                  className={`p-6 bg-white/5 backdrop-blur-sm rounded-xl border transition-all duration-200 cursor-pointer ${
                    activeIdentity === index
                      ? "border-blue-500/50 bg-blue-500/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                  onClick={() => setActiveIdentity(index)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                        <Shield className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {identity.name}
                        </h3>
                        <p className="text-sm text-gray-300">{identity.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          identity.status === "Active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {identity.status}
                      </span>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {identity.credentials}
                      </div>
                      <div className="text-sm text-gray-400">Credentials</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {identity.verifications}
                      </div>
                      <div className="text-sm text-gray-400">Verifications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">92%</div>
                      <div className="text-sm text-gray-400">Trust Score</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Created: {identity.created}</span>
                    <span className="font-mono">{identity.did}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Identity Details */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">
                Identity Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    DID
                  </label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 p-2 bg-black/20 text-blue-400 rounded text-sm font-mono">
                      {identities[activeIdentity].did}
                    </code>
                    <button
                      onClick={() => setShowQRModal(true)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <QrCode className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Private Key
                  </label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 p-2 bg-black/20 text-gray-400 rounded text-sm font-mono">
                      {showPrivateKey
                        ? "0x1234567890abcdef..."
                        : "••••••••••••••••••••"}
                    </code>
                    <button
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPrivateKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setImportExportType("export");
                      setShowImportExportModal(true);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => {
                      setImportExportType("import");
                      setShowImportExportModal(true);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Import</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">
                Recovery Options
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => setShowRecoveryModal(true)}
                  className="w-full flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Key className="h-5 w-5 text-blue-400" />
                  <span className="text-white">Seed Phrase Backup</span>
                </button>
                <button
                  onClick={() => setShowRecoveryModal(true)}
                  className="w-full flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-white">Social Recovery</span>
                </button>
                <button
                  onClick={() => setShowRecoveryModal(true)}
                  className="w-full flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Upload className="h-5 w-5 text-purple-400" />
                  <span className="text-white">Multi-sig Guardian</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Create Identity Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-900 rounded-xl p-6 max-w-md w-full mx-4 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">
                Create New Identity
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Identity Name
                  </label>
                  <input
                    type="text"
                    value={newIdentity.name}
                    onChange={(e) =>
                      setNewIdentity({ ...newIdentity, name: e.target.value })
                    }
                    className="w-full p-3 bg-black/20 text-white rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter identity name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type
                  </label>
                  <select
                    value={newIdentity.type}
                    onChange={(e) =>
                      setNewIdentity({ ...newIdentity, type: e.target.value })
                    }
                    className="w-full p-3 bg-black/20 text-white rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Professional">Professional</option>
                    <option value="Developer">Developer</option>
                    <option value="Academic">Academic</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newIdentity.description}
                    onChange={(e) =>
                      setNewIdentity({
                        ...newIdentity,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full p-3 bg-black/20 text-white rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                    placeholder="Describe this identity..."
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2 px-4 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle create identity
                    setShowCreateModal(false);
                    setNewIdentity({
                      name: "",
                      type: "Professional",
                      description: "",
                    });
                  }}
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* QR Code Modal */}
        {showQRModal && (
          <QRCodeModal
            data={identities[activeIdentity].did}
            title="Identity DID QR Code"
            onClose={() => setShowQRModal(false)}
          />
        )}

        {/* Recovery Modal */}
        {showRecoveryModal && (
          <RecoveryModal
            identity={identities[activeIdentity]}
            onClose={() => setShowRecoveryModal(false)}
          />
        )}

        {/* Import/Export Modal */}
        {showImportExportModal && (
          <ImportExportModal
            type={importExportType}
            identity={identities[activeIdentity]}
            onClose={() => setShowImportExportModal(false)}
          />
        )}
      </div>
    </div>
  );
};
