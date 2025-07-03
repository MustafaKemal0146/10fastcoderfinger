import React from 'react';
import { Trophy } from 'lucide-react';

// Örnek başarımlar
const achievements = [
  {
    id: 1,
    title: 'İlk Oyununu Tamamla',
    description: 'İlk kod yazma oyununu başarıyla tamamla.',
    icon: <Trophy className="h-8 w-8 text-yellow-400" />,
    achieved: true,
  },
  {
    id: 2,
    title: '10 Oyun Tamamla',
    description: 'Toplamda 10 oyun tamamla.',
    icon: <Trophy className="h-8 w-8 text-gray-400" />,
    achieved: false,
  },
  {
    id: 3,
    title: 'Yüksek Hız',
    description: 'Bir oyunda 80 WPM üzeri hız yap.',
    icon: <Trophy className="h-8 w-8 text-yellow-400" />,
    achieved: false,
  },
];

export const AchievementPanel: React.FC = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Trophy className="h-7 w-7 text-yellow-400 mr-2" /> Başarımlar
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`flex items-center space-x-4 p-4 rounded-lg border transition-colors ${ach.achieved ? 'border-yellow-400 bg-yellow-900/10' : 'border-gray-700 bg-gray-900/30'}`}
          >
            {ach.icon}
            <div>
              <div className={`font-semibold text-lg ${ach.achieved ? 'text-yellow-300' : 'text-gray-300'}`}>{ach.title}</div>
              <div className="text-gray-400 text-sm">{ach.description}</div>
              {ach.achieved && <span className="text-xs text-green-400 font-bold">Kazanıldı!</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementPanel;