import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSpeechRecognition } from './useSpeechRecognition';
import { Mic, MicOff, RotateCcw, AlertCircle, Info } from 'lucide-react';

interface TranscriptionPanelProps {
  transcript: string;
  setTranscript: (text: string) => void;
}

export default function TranscriptionPanel({ transcript, setTranscript }: TranscriptionPanelProps) {
  const {
    isListening,
    interimTranscript,
    finalTranscript,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (finalTranscript) {
      setTranscript(finalTranscript);
    }
  }, [finalTranscript, setTranscript]);

  const handleClear = () => {
    resetTranscript();
    setTranscript('');
  };

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Speech-to-Text</CardTitle>
          <CardDescription>Convert your speech to text</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Speech recognition is not supported in your browser. Please try using Chrome, Edge, or Safari on desktop for the best experience.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="w-5 h-5" />
          Speech-to-Text
        </CardTitle>
        <CardDescription>
          Speak to convert your voice to text
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-3">
            {!isListening ? (
              <Button onClick={startListening} size="lg" className="gap-2">
                <Mic className="w-5 h-5" />
                Start Transcription
              </Button>
            ) : (
              <Button onClick={stopListening} variant="destructive" size="lg" className="gap-2">
                <MicOff className="w-5 h-5" />
                Stop Transcription
              </Button>
            )}
            <Button onClick={handleClear} variant="outline" size="lg" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Clear
            </Button>
          </div>

          {isListening && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              Listening...
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Transcript</label>
          <Textarea
            value={transcript + (interimTranscript ? ' ' + interimTranscript : '')}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your transcribed text will appear here. You can also type or edit directly."
            className="min-h-[200px] font-mono"
          />
          {interimTranscript && (
            <p className="text-xs text-muted-foreground italic">
              Interim: {interimTranscript}
            </p>
          )}
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            The transcript is editable. You can manually correct any errors or type additional text.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
