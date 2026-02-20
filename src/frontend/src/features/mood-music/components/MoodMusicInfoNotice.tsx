import { Alert, AlertDescription } from '@/components/ui/alert';
import { Music } from 'lucide-react';

export default function MoodMusicInfoNotice() {
  return (
    <Alert>
      <Music className="h-4 w-4" />
      <AlertDescription>
        This feature uses sample audio tracks for demonstration. Audio playback works directly in your browser without external streaming services.
      </AlertDescription>
    </Alert>
  );
}
