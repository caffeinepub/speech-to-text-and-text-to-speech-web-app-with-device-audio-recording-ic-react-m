import { Mood } from '../types';
import { Card } from '@/components/ui/card';

interface MoodSelectorProps {
  selectedMood: Mood;
  onMoodSelect: (mood: Mood) => void;
}

const moods: Array<{ mood: Mood; icon: string; label: string }> = [
  { mood: 'Happy', icon: '/assets/generated/mood-happy.dim_256x256.png', label: 'Happy' },
  { mood: 'Calm', icon: '/assets/generated/mood-calm.dim_256x256.png', label: 'Calm' },
  { mood: 'Sad', icon: '/assets/generated/mood-sad.dim_256x256.png', label: 'Sad' },
  { mood: 'Energetic', icon: '/assets/generated/mood-energetic.dim_256x256.png', label: 'Energetic' },
];

export default function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {moods.map(({ mood, icon, label }) => (
        <Card
          key={mood}
          className={`cursor-pointer transition-all hover:scale-105 ${
            selectedMood === mood
              ? 'ring-2 ring-primary bg-primary/5'
              : 'hover:bg-accent/50'
          }`}
          onClick={() => onMoodSelect(mood)}
        >
          <div className="p-4 flex flex-col items-center gap-3">
            <div className="w-20 h-20 flex items-center justify-center">
              <img
                src={icon}
                alt={`${label} mood`}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-medium text-sm text-center">{label}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
