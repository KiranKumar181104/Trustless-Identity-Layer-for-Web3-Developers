import React from 'react';
import { Shield, Github, Twitter, Disc as Discord, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/20 border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">TrustLayer</span>
            </div>
            <p className="text-gray-300 text-sm">
              Building the future of decentralized identity with trustless verification and privacy-preserving technologies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Discord className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Identity Management
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Credential Verification
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                ZK Proofs
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Developer Tools
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Documentation
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                API Reference
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Community
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Blog
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Careers
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 TrustLayer. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};