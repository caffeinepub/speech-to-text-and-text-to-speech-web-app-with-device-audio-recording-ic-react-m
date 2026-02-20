import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function InfoNotice() {
  return (
    <div className="mt-8">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className="text-xs">
          <strong>About this app:</strong> VoiceFlow uses browser-native speech capabilities. 
          Speech-to-text and text-to-speech features rely on your browser's built-in APIs and 
          may vary by device and browser. For the best experience, use Chrome, Edge, or Safari 
          on desktop. No external APIs (Google Gemini or third-party TTS services) are used. 
          All processing happens locally in your browser.
        </AlertDescription>
      </Alert>
    </div>
  );
}
