import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Wifi, WifiOff } from 'lucide-react';
import { MultiplayerLobby } from '../components/multiplayer/MultiplayerLobby';
import { RoomSettings } from '../types';

export const Multiplayer: React.FC = () => {
  const [currentView, setCurrentView] = useState<'lobby' | 'room'>('lobby');
  const [isConnected, setIsConnected] = useState(true);

  const handleJoinRoom = (roomId: string) => {
    console.log('Joining room:', roomId);
    setCurrentView('room');
  };

  const handleCreateRoom = (settings: RoomSettings) => {
    console.log('Creating room with settings:', settings);
    setCurrentView('room');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Multiplayer</h1>
          <p className="text-gray-400">Compete with friends and players worldwide</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <div className="flex items-center space-x-2 text-green-400">
              <Wifi className="h-5 w-5" />
              <span className="text-sm">Connected</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-red-400">
              <WifiOff className="h-5 w-5" />
              <span className="text-sm">Disconnected</span>
            </div>
          )}
        </div>
      </div>

      {/* Connection Status */}
      {!isConnected && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/30 rounded-xl p-4"
        >
          <div className="flex items-center space-x-3">
            <WifiOff className="h-5 w-5 text-red-400" />
            <div>
              <p className="text-red-300 font-medium">Connection Lost</p>
              <p className="text-red-400 text-sm">Trying to reconnect...</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {currentView === 'lobby' && (
          <MultiplayerLobby
            onJoinRoom={handleJoinRoom}
            onCreateRoom={handleCreateRoom}
          />
        )}

        {currentView === 'room' && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
            <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Room View</h3>
            <p className="text-gray-400 mb-6">
              Multiplayer room functionality will be implemented here.
            </p>
            <button
              onClick={() => setCurrentView('lobby')}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Back to Lobby
            </button>
          </div>
        )}
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-600/20 rounded-lg">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Players Online</p>
              <p className="text-2xl font-bold text-white">1,234</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-600/20 rounded-lg">
              <span className="text-2xl">🏆</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Active Rooms</p>
              <p className="text-2xl font-bold text-white">42</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-600/20 rounded-lg">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Games Today</p>
              <p className="text-2xl font-bold text-white">567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};