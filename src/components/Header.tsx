import React from 'react';
import { Shield, Wallet, Menu, X } from 'lucide-react';
import { Auth } from './Auth';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  isConnected, 
  setIsConnected 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showAuth, setShowAuth] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'identity', label: 'Identity' },
    { id: 'verify', label: 'Verify' },
    { id: 'developer', label: 'Developer' },
  ];

  const handleConnect = () => {
    if (isConnected) {
      // Disconnect
      setIsConnected(false);
      setUser(null);
      setActiveTab('home');
    } else {
      // Show auth modal
      setShowAuth(true);
    }
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsConnected(true);
    setShowAuth(false);
    setActiveTab('dashboard');
  };

  return (
    <header className="fixed top-0 w-full bg-black/20 backdrop-blur-xl border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">TrustLayer</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'text-blue-400 bg-blue-400/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Connect Button */}
          <div className="flex items-center space-x-4">
            {isConnected && user && (
              <div className="hidden sm:flex items-center space-x-2 text-white">
                <img 
                  src={user.avatar} 
                  alt={user.firstName}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm">{user.firstName}</span>
              </div>
            )}
            <button
              onClick={handleConnect}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isConnected
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
              }`}
            >
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">
                {isConnected ? 'Disconnect' : 'Connect'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === item.id
                    ? 'text-blue-400 bg-blue-400/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Auth Modal */}
      {showAuth && (
        <Auth 
          onLogin={handleLogin}
          onClose={() => setShowAuth(false)}
        />
      )}
    </header>
  );
};