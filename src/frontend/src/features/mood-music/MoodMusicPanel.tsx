import { useState, useMemo } from 'react';
import { Mood, SortMode } from './types';
import { musicCatalog } from './catalog';
import { useAudioPlayer } from './useAudioPlayer';
import MoodSelector from './components/MoodSelector';
import TrackList from './components/TrackList';
import MoodMusicInfoNotice from './components/MoodMusicInfoNotice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Clock, Music } from 'lucide-react';

export default function MoodMusicPanel() {
  const [selectedMood, setSelectedMood] = useState<Mood>('Happy');
  const [sortMode, setSortMode] = useState<SortMode>('default');
  const { currentTrack, isPlaying, currentTime, duration, error, togglePlayPause, seek } = useAudioPlayer();

  const filteredTracks = useMemo(() => {
    let tracks = musicCatalog.filter((track) => track.moods.includes(selectedMood));

    if (sortMode === 'latest') {
      tracks = [...tracks].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return tracks;
  }, [selectedMood, sortMode]);

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <MoodMusicInfoNotice />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Music className="w-5 h-5" />
            Select Your Mood
          </h2>
          <Button
            variant={sortMode === 'latest' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortMode(sortMode === 'latest' ? 'default' : 'latest')}
            className="flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Latest
          </Button>
        </div>
        <MoodSelector selectedMood={selectedMood} onMoodSelect={setSelectedMood} />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">
          {selectedMood} Tracks ({filteredTracks.length})
        </h2>
        <TrackList
          tracks={filteredTracks}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTrackToggle={togglePlayPause}
          error={error}
        />
      </div>

      {currentTrack && (
        <Card className="sticky bottom-4 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Now Playing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-semibold text-sm truncate">{currentTrack.title}</p>
              <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>

            {error && (
              <div className="text-xs text-destructive bg-destructive/10 p-2 rounded">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={0.1}
                onValueChange={([value]) => seek(value)}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
