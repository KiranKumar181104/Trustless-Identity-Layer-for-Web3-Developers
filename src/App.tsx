import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { IdentityManager } from './components/IdentityManager';
import { CredentialVerifier } from './components/CredentialVerifier';
import { DeveloperTools } from './components/DeveloperTools';
import { Footer } from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
      
      <main className="pt-16">
        {activeTab === 'home' && <Hero setActiveTab={setActiveTab} />}
        {activeTab === 'dashboard' && <Dashboard isConnected={isConnected} />}
        {activeTab === 'identity' && <IdentityManager isConnected={isConnected} />}
        {activeTab === 'verify' && <CredentialVerifier />}
        {activeTab === 'developer' && <DeveloperTools />}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;