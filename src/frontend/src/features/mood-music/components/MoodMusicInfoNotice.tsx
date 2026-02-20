import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function MoodMusicInfoNotice() {
  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertDescription className="text-xs">
        <strong>About Mood Music:</strong> This feature uses app-bundled audio files for playback. 
        All music is stored locally within the application and does not require external streaming 
        services or third-party APIs. Select a mood to discover tracks that match your current vibe.
      </AlertDescription>
    </Alert>
  );
}
