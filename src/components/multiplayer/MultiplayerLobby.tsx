import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Search, Crown, Lock, Globe } from 'lucide-react';
import { MultiplayerRoom, RoomSettings } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface MultiplayerLobbyProps {
  onJoinRoom: (roomId: string) => void;
  onCreateRoom: (settings: RoomSettings) => void;
}

export const MultiplayerLobby: React.FC<MultiplayerLobbyProps> = ({
  onJoinRoom,
  onCreateRoom,
}) => {
  const [rooms, setRooms] = useState<MultiplayerRoom[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { userProfile } = useAuth();

  const mockRooms: MultiplayerRoom[] = [
    {
      id: '1',
      name: 'Speed Demons',
      host_id: 'user1',
      snippet_id: 'snippet1',
      max_players: 4,
      current_players: 2,
      status: 'waiting',
      created_at: new Date().toISOString(),
      settings: {
        language: 'javascript',
        difficulty: 'medium',
        allow_spectators: true,
        private: false,
      },
    },
    {
      id: '2',
      name: 'Python Masters',
      host_id: 'user2',
      snippet_id: 'snippet2',
      max_players: 6,
      current_players: 4,
      status: 'waiting',
      created_at: new Date().toISOString(),
      settings: {
        language: 'python',
        difficulty: 'hard',
        allow_spectators: false,
        private: false,
      },
    },
  ];

  useEffect(() => {
    setRooms(mockRooms);
  }, []);

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.settings.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CreateRoomModal = () => {
    const [roomName, setRoomName] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [difficulty, setDifficulty] = useState('medium');
    const [maxPlayers, setMaxPlayers] = useState(4);
    const [isPrivate, setIsPrivate] = useState(false);
    const [allowSpectators, setAllowSpectators] = useState(true);

    const handleCreate = () => {
      const settings: RoomSettings = {
        language,
        difficulty: difficulty as 'easy' | 'medium' | 'hard',
        allow_spectators: allowSpectators,
        private: isPrivate,
      };
      onCreateRoom(settings);
      setShowCreateModal(false);
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setShowCreateModal(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-bold text-white mb-4">Create Room</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Room Name
              </label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                placeholder="Enter room name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="csharp">C#</option>
                  <option value="java">Java</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Max Players: {maxPlayers}
              </label>
              <input
                type="range"
                min="2"
                max="8"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="rounded"
                />
                <span className="text-gray-300">Private Room</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={allowSpectators}
                  onChange={(e) => setAllowSpectators(e.target.checked)}
                  className="rounded"
                />
                <span className="text-gray-300">Allow Spectators</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setShowCreateModal(false)}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Create
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Multiplayer Lobby</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create Room</span>
        </motion.button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search rooms..."
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredRooms.map((room) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{room.name}</h3>
                  {room.settings.private ? (
                    <Lock className="h-4 w-4 text-yellow-400" />
                  ) : (
                    <Globe className="h-4 w-4 text-green-400" />
                  )}
                  <Crown className="h-4 w-4 text-yellow-400" />
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{room.current_players}/{room.max_players}</span>
                  </span>
                  <span className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded">
                    {room.settings.language}
                  </span>
                  <span className={`px-2 py-1 rounded ${
                    room.settings.difficulty === 'easy' ? 'bg-green-600/20 text-green-300' :
                    room.settings.difficulty === 'medium' ? 'bg-yellow-600/20 text-yellow-300' :
                    'bg-red-600/20 text-red-300'
                  }`}>
                    {room.settings.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded ${
                    room.status === 'waiting' ? 'bg-green-600/20 text-green-300' :
                    room.status === 'in_progress' ? 'bg-yellow-600/20 text-yellow-300' :
                    'bg-gray-600/20 text-gray-300'
                  }`}>
                    {room.status}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onJoinRoom(room.id)}
                disabled={room.current_players >= room.max_players || room.status !== 'waiting'}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                {room.status === 'waiting' ? 'Join' : 'Spectate'}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {showCreateModal && <CreateRoomModal />}
    </div>
  );
};