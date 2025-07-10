import React from 'react';
import { Shield, Zap, Lock, Users, ArrowRight, Code, Database } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  const features = [
    {
      icon: Shield,
      title: 'Decentralized Identity',
      description: 'Self-sovereign identity management with DID standards'
    },
    {
      icon: Lock,
      title: 'Zero-Knowledge Proofs',
      description: 'Privacy-preserving credential verification'
    },
    {
      icon: Database,
      title: 'IPFS Storage',
      description: 'Distributed storage for identity credentials'
    },
    {
      icon: Code,
      title: 'Developer APIs',
      description: 'Easy integration with comprehensive tooling'
    },
    {
      icon: Users,
      title: 'Professional Network',
      description: 'Verified professional connections and endorsements'
    },
    {
      icon: Zap,
      title: 'Instant Verification',
      description: 'Real-time credential and identity verification'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]" />

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Trustless Identity Layer for{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Web3 Developers
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Build the future of decentralized identity with our comprehensive platform. 
              Secure, private, and developer-friendly identity management for the Web3 ecosystem.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveTab('developer')}
              className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/20"
            >
              Developer Tools
              <Code className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Built on Cutting-Edge Technology</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-blue-400 font-semibold">Smart Contracts</div>
              <div className="text-gray-300">Solidity</div>
            </div>
            <div className="space-y-2">
              <div className="text-purple-400 font-semibold">Identity</div>
              <div className="text-gray-300">DID, Veramo, Ceramic</div>
            </div>
            <div className="space-y-2">
              <div className="text-pink-400 font-semibold">Privacy</div>
              <div className="text-gray-300">ZK Proofs, Circom</div>
            </div>
            <div className="space-y-2">
              <div className="text-green-400 font-semibold">Storage</div>
              <div className="text-gray-300">IPFS, Filecoin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};