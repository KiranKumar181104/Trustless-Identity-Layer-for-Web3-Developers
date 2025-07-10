import React, { useState } from 'react';
import { Code, Terminal, Book, Key, Zap, Copy, Download, ExternalLink } from 'lucide-react';

export const DeveloperTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState('api');
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Production Key',
      key: 'sk_live_1234567890abcdef1234567890abcdef12345678',
      created: '2024-01-15',
      lastUsed: '2024-01-20',
      requests: 1234,
      status: 'active'
    },
    {
      id: '2', 
      name: 'Development Key',
      key: 'sk_test_abcdef1234567890abcdef1234567890abcdef12',
      created: '2024-01-10',
      lastUsed: '2024-01-19',
      requests: 567,
      status: 'active'
    }
  ]);
  const [showCreateKey, setShowCreateKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [generatingKey, setGeneratingKey] = useState(false);

  const codeExamples = {
    createIdentity: `// Create a new decentralized identity
const identity = await TrustLayer.createIdentity({
  name: "Developer Identity",
  type: "professional",
  recoveryMethods: ["social", "multisig"]
});

console.log("DID:", identity.did);`,
    
    verifyCredential: `// Verify a credential with ZK proof
const verification = await TrustLayer.verifyCredential({
  credentialId: "cred_123...",
  zkProof: true,
  checkRevocation: true
});

console.log("Valid:", verification.isValid);`,
    
    issueCredential: `// Issue a new credential
const credential = await TrustLayer.issueCredential({
  holder: "did:web3:0x1234...",
  credentialType: "professional_certification",
  claims: {
    title: "Senior Software Engineer",
    issuer: "TechCorp Inc."
  },
  expiryDate: "2025-12-31"
});`
  };

  const sdkFeatures = [
    {
      title: 'Identity Management',
      description: 'Create, manage, and recover decentralized identities',
      endpoints: [
        'POST /api/v1/identities',
        'GET /api/v1/identities/{did}',
        'PUT /api/v1/identities/{did}',
        'DELETE /api/v1/identities/{did}'
      ]
    },
    {
      title: 'Credential Issuance',
      description: 'Issue and manage verifiable credentials',
      endpoints: [
        'POST /api/v1/credentials',
        'GET /api/v1/credentials/{id}',
        'POST /api/v1/credentials/{id}/revoke'
      ]
    },
    {
      title: 'Verification Services',
      description: 'Verify credentials and identity proofs',
      endpoints: [
        'POST /api/v1/verify/credential',
        'POST /api/v1/verify/identity',
        'GET /api/v1/verify/status/{id}'
      ]
    },
    {
      title: 'ZK Proof Generation',
      description: 'Generate and verify zero-knowledge proofs',
      endpoints: [
        'POST /api/v1/zk/generate',
        'POST /api/v1/zk/verify',
        'GET /api/v1/zk/circuits'
      ]
    }
  ];

  const generateNewKey = async () => {
    if (!newKeyName.trim()) return;
    
    setGeneratingKey(true);
    
    // Simulate API key generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: 'sk_' + (newKeyName.toLowerCase().includes('prod') ? 'live' : 'test') + '_' + 
            Math.random().toString(36).substr(2, 32) + Math.random().toString(36).substr(2, 8),
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      requests: 0,
      status: 'active'
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setShowCreateKey(false);
    setGeneratingKey(false);
  };

  const revokeKey = (keyId: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === keyId ? { ...key, status: 'revoked' } : key
    ));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Developer Tools</h1>
          <p className="text-gray-300">Integrate trustless identity into your applications</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {[
            { id: 'api', label: 'API Reference', icon: Code },
            { id: 'sdk', label: 'SDK', icon: Terminal },
            { id: 'docs', label: 'Documentation', icon: Book },
            { id: 'keys', label: 'API Keys', icon: Key }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === id
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* API Reference Tab */}
        {activeTab === 'api' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">API Endpoints</h2>
                <div className="space-y-6">
                  {sdkFeatures.map((feature, index) => (
                    <div key={index} className="border-b border-white/10 pb-6 last:border-b-0">
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300 mb-4">{feature.description}</p>
                      <div className="space-y-2">
                        {feature.endpoints.map((endpoint, i) => (
                          <div key={i} className="flex items-center space-x-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              endpoint.startsWith('POST') ? 'bg-green-500/20 text-green-400' :
                              endpoint.startsWith('GET') ? 'bg-blue-500/20 text-blue-400' :
                              endpoint.startsWith('PUT') ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {endpoint.split(' ')[0]}
                            </span>
                            <code className="text-gray-300 font-mono text-sm">{endpoint.split(' ')[1]}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Quick Start</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-black/20 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">1. Get API Key</h3>
                    <p className="text-sm text-gray-300">Generate your API key from the dashboard</p>
                  </div>
                  <div className="p-4 bg-black/20 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">2. Install SDK</h3>
                    <code className="text-sm text-blue-400">npm install @trustlayer/sdk</code>
                  </div>
                  <div className="p-4 bg-black/20 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">3. Initialize</h3>
                    <p className="text-sm text-gray-300">Configure with your API key</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Rate Limits</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Free Tier</span>
                    <span className="text-white">100 req/min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Pro Tier</span>
                    <span className="text-white">1000 req/min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Enterprise</span>
                    <span className="text-white">Unlimited</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SDK Tab */}
        {activeTab === 'sdk' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Installation</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-black/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Node.js</span>
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <code className="text-blue-400 text-sm">npm install @trustlayer/sdk</code>
                  </div>
                  <div className="p-4 bg-black/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Python</span>
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <code className="text-blue-400 text-sm">pip install trustlayer-python</code>
                  </div>
                  <div className="p-4 bg-black/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Go</span>
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <code className="text-blue-400 text-sm">go get github.com/trustlayer/go-sdk</code>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Code Examples</h2>
                <div className="space-y-4">
                  {Object.entries(codeExamples).map(([key, code]) => (
                    <div key={key} className="p-4 bg-black/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <button className="p-1 text-gray-400 hover:text-white transition-colors">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                      <pre className="text-sm text-blue-400 overflow-x-auto">
                        <code>{code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">SDK Features</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Identity Management', desc: 'Create and manage DIDs' },
                    { title: 'Credential Issuance', desc: 'Issue verifiable credentials' },
                    { title: 'ZK Proof Generation', desc: 'Privacy-preserving proofs' },
                    { title: 'IPFS Integration', desc: 'Decentralized storage' },
                    { title: 'Wallet Connection', desc: 'Web3 wallet integration' },
                    { title: 'TypeScript Support', desc: 'Full type definitions' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                      <Zap className="h-5 w-5 text-blue-400 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-white">{feature.title}</h3>
                        <p className="text-sm text-gray-300">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Resources</h2>
                <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <span className="text-white">GitHub Repository</span>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <span className="text-white">API Documentation</span>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <span className="text-white">Example Projects</span>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <span className="text-white">Discord Community</span>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documentation Tab */}
        {activeTab === 'docs' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Documentation</h2>
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-lg font-semibold text-white mb-4">Getting Started</h3>
                  <p className="text-gray-300 mb-4">
                    TrustLayer provides a comprehensive platform for building trustless identity solutions in Web3. 
                    Our APIs and SDKs make it easy to integrate decentralized identity management into your applications.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mb-4">Core Concepts</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-black/20 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Decentralized Identifiers (DIDs)</h4>
                      <p className="text-gray-300 text-sm">
                        DIDs are self-sovereign identifiers that enable verifiable, decentralized digital identity.
                      </p>
                    </div>
                    <div className="p-4 bg-black/20 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Verifiable Credentials</h4>
                      <p className="text-gray-300 text-sm">
                        Tamper-evident credentials that can be verified cryptographically.
                      </p>
                    </div>
                    <div className="p-4 bg-black/20 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Zero-Knowledge Proofs</h4>
                      <p className="text-gray-300 text-sm">
                        Privacy-preserving proofs that verify claims without revealing underlying data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
                <div className="space-y-2">
                  <a href="#" className="block p-2 text-blue-400 hover:text-blue-300 transition-colors">
                    Authentication
                  </a>
                  <a href="#" className="block p-2 text-blue-400 hover:text-blue-300 transition-colors">
                    Identity Management
                  </a>
                  <a href="#" className="block p-2 text-blue-400 hover:text-blue-300 transition-colors">
                    Credential Issuance
                  </a>
                  <a href="#" className="block p-2 text-blue-400 hover:text-blue-300 transition-colors">
                    Verification
                  </a>
                  <a href="#" className="block p-2 text-blue-400 hover:text-blue-300 transition-colors">
                    ZK Proofs
                  </a>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Support</h2>
                <div className="space-y-3">
                  <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                    <Book className="h-4 w-4" />
                    <span>FAQ</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                    <Terminal className="h-4 w-4" />
                    <span>Discord</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                    <ExternalLink className="h-4 w-4" />
                    <span>GitHub Issues</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Keys Tab */}
        {activeTab === 'keys' && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">API Keys</h2>
                <button
                  onClick={() => setShowCreateKey(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                >
                  <Key className="h-4 w-4" />
                  <span>Generate New Key</span>
                </button>
              </div>
              
              <div className="space-y-6">
                {/* API Keys List */}
                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="p-4 bg-black/20 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-white">{apiKey.name}</h3>
                          <p className="text-sm text-gray-300">Created on {apiKey.created}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            apiKey.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {apiKey.status}
                          </span>
                          {apiKey.status === 'active' && (
                            <button
                              onClick={() => revokeKey(apiKey.id)}
                              className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors text-xs"
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <code className="flex-1 p-2 bg-black/40 text-blue-400 rounded text-sm font-mono">
                          {apiKey.key}
                        </code>
                        <button 
                          onClick={() => copyToClipboard(apiKey.key)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Last Used:</span>
                          <p className="text-white">{apiKey.lastUsed}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Requests:</span>
                          <p className="text-white">{apiKey.requests.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-black/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">
                      {apiKeys.reduce((sum, key) => sum + key.requests, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Requests this month</div>
                  </div>
                  <div className="p-4 bg-black/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">99.9%</div>
                    <div className="text-sm text-gray-400">Uptime</div>
                  </div>
                  <div className="p-4 bg-black/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">0.12s</div>
                    <div className="text-sm text-gray-400">Avg response time</div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <h3 className="font-semibold text-yellow-400 mb-2">Security Best Practices</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Never expose your API key in client-side code</li>
                    <li>• Use environment variables to store API keys</li>
                    <li>• Regenerate keys regularly</li>
                    <li>• Monitor API usage for suspicious activity</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Create API Key Modal */}
            {showCreateKey && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-slate-900 rounded-xl p-6 max-w-md w-full mx-4 border border-white/10">
                  <h2 className="text-xl font-bold text-white mb-4">Generate New API Key</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Key Name
                      </label>
                      <input
                        type="text"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        className="w-full p-3 bg-black/20 text-white rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                        placeholder="e.g., Production API Key"
                      />
                    </div>
                    
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-yellow-400 text-sm">
                        <strong>Important:</strong> Copy your API key immediately after generation. 
                        You won't be able to see it again.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={() => {
                        setShowCreateKey(false);
                        setNewKeyName('');
                      }}
                      className="flex-1 py-2 px-4 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={generateNewKey}
                      disabled={!newKeyName.trim() || generatingKey}
                      className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {generatingKey ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Key className="h-4 w-4" />
                          <span>Generate</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};