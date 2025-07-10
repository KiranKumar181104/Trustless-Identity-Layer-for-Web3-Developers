import React, { useState } from 'react';
import { Shield, Users, Award, Activity, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface DashboardProps {
  isConnected: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ isConnected }) => {
  const [stats] = useState({
    totalIdentities: 12,
    verifiedCredentials: 8,
    trustScore: 92,
    networkConnections: 156
  });

  const recentActivity = [
    { type: 'verified', message: 'Professional certification verified', time: '2 hours ago' },
    { type: 'credential', message: 'New skill credential added', time: '1 day ago' },
    { type: 'connection', message: 'Trust relationship established', time: '2 days ago' },
    { type: 'update', message: 'Identity profile updated', time: '3 days ago' }
  ];

  const credentials = [
    {
      title: 'Senior Software Engineer',
      issuer: 'TechCorp Inc.',
      status: 'verified',
      date: '2024-01-15',
      zkProof: true
    },
    {
      title: 'Blockchain Developer Certification',
      issuer: 'Web3 Academy',
      status: 'verified',
      date: '2024-01-10',
      zkProof: true
    },
    {
      title: 'Smart Contract Auditor',
      issuer: 'Security Labs',
      status: 'pending',
      date: '2024-01-20',
      zkProof: false
    }
  ];

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Connect Your Wallet</h2>
          <p className="text-gray-300 max-w-md">
            Please connect your Web3 wallet to access your identity dashboard and manage your credentials.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Identity Dashboard</h1>
          <p className="text-gray-300">Manage your decentralized identity and credentials</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.totalIdentities}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-300">Total Identities</h3>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Award className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.verifiedCredentials}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-300">Verified Credentials</h3>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.trustScore}%</span>
            </div>
            <h3 className="text-sm font-medium text-gray-300">Trust Score</h3>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-pink-500/20 rounded-lg">
                <Users className="h-6 w-6 text-pink-400" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.networkConnections}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-300">Network Connections</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Credentials */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6">Your Credentials</h2>
              <div className="space-y-4">
                {credentials.map((credential, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        credential.status === 'verified' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                      }`}>
                        {credential.status === 'verified' ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{credential.title}</h3>
                        <p className="text-sm text-gray-300">{credential.issuer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          credential.status === 'verified' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {credential.status}
                        </span>
                        {credential.zkProof && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                            ZK
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{credential.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Activity className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};