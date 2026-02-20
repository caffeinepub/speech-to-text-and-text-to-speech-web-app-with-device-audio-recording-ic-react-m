import { Track } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause } from 'lucide-react';

interface TrackListProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackToggle: (track: Track) => void;
}

export default function TrackList({ tracks, currentTrack, isPlaying, onTrackToggle }: TrackListProps) {
  if (tracks.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          No tracks found for this mood.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {tracks.map((track) => {
        const isCurrentTrack = currentTrack?.id === track.id;
        const isCurrentlyPlaying = isCurrentTrack && isPlaying;

        return (
          <Card
            key={track.id}
            className={`transition-all ${
              isCurrentTrack ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <Button
                size="icon"
                variant={isCurrentTrack ? 'default' : 'outline'}
                onClick={() => onTrackToggle(track)}
                className="shrink-0"
              >
                {isCurrentlyPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{track.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
              </div>

              <div className="flex gap-1 flex-wrap justify-end">
                {track.moods.map((mood) => (
                  <Badge key={mood} variant="secondary" className="text-xs">
                    {mood}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
