import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSpeechSynthesis } from './useSpeechSynthesis';
import { Volume2, VolumeX, AlertCircle } from 'lucide-react';

interface TextToSpeechPanelProps {
  transcript: string;
}

export default function TextToSpeechPanel({ transcript }: TextToSpeechPanelProps) {
  const {
    isSpeaking,
    isSupported,
    voices,
    selectedVoice,
    rate,
    setSelectedVoice,
    setRate,
    speak,
    stop,
  } = useSpeechSynthesis();

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Text-to-Speech</CardTitle>
          <CardDescription>Listen to your text</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Text-to-speech is not supported in your browser. Please try using a modern browser like Chrome, Edge, Firefox, or Safari.
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
          <Volume2 className="w-5 h-5" />
          Text-to-Speech
        </CardTitle>
        <CardDescription>
          Listen to your text spoken aloud
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!transcript && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No text available. Please go to the Transcribe tab to add text.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {voices.length > 0 && (
            <div className="space-y-2">
              <Label>Voice</Label>
              <Select
                value={selectedVoice?.name || ''}
                onValueChange={(value) => {
                  const voice = voices.find((v) => v.name === value);
                  if (voice) setSelectedVoice(voice);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label>Speaking Rate: {rate.toFixed(1)}x</Label>
            <Slider
              value={[rate]}
              onValueChange={(values) => setRate(values[0])}
              min={0.5}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-center gap-3">
          {!isSpeaking ? (
            <Button
              onClick={() => speak(transcript)}
              disabled={!transcript}
              size="lg"
              className="gap-2"
            >
              <Volume2 className="w-5 h-5" />
              Speak Text
            </Button>
          ) : (
            <Button onClick={stop} variant="destructive" size="lg" className="gap-2">
              <VolumeX className="w-5 h-5" />
              Stop Speaking
            </Button>
          )}
        </div>

        {transcript && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Text to be spoken:</p>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{transcript}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
