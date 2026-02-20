import { useState, useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from './hooks/useQueries';
import LoginButton from './components/auth/LoginButton';
import ProfileSetupDialog from './components/auth/ProfileSetupDialog';
import AudioRecorder from './features/audio/AudioRecorder';
import TranscriptionPanel from './features/stt/TranscriptionPanel';
import TextToSpeechPanel from './features/tts/TextToSpeechPanel';
import HistoryPanel from './features/history/HistoryPanel';
import MoodMusicPanel from './features/mood-music/MoodMusicPanel';
import InfoNotice from './components/InfoNotice';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, FileText, Volume2, History, Music } from 'lucide-react';

export default function App() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { mutate: saveProfile } = useSaveCallerUserProfile();
  
  const [transcript, setTranscript] = useState('');
  const [activeTab, setActiveTab] = useState('record');

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleProfileSave = (name: string) => {
    saveProfile({ name });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Mood Based Music</h1>
              <p className="text-xs text-muted-foreground">Music for Every Mood</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated && userProfile && (
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Welcome, {userProfile.name}
              </span>
            )}
            <LoginButton />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="music" className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Music</span>
            </TabsTrigger>
            <TabsTrigger value="record" className="flex items-center gap-2">
              <Mic className="w-4 h-4" />
              <span className="hidden sm:inline">Record</span>
            </TabsTrigger>
            <TabsTrigger value="transcribe" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Transcribe</span>
            </TabsTrigger>
            <TabsTrigger value="speak" className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">Speak</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="music" className="mt-0">
            <MoodMusicPanel />
          </TabsContent>

          <TabsContent value="record" className="mt-0">
            <AudioRecorder />
          </TabsContent>

          <TabsContent value="transcribe" className="mt-0">
            <TranscriptionPanel transcript={transcript} setTranscript={setTranscript} />
          </TabsContent>

          <TabsContent value="speak" className="mt-0">
            <TextToSpeechPanel transcript={transcript} />
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <HistoryPanel 
              isAuthenticated={isAuthenticated} 
              currentTranscript={transcript}
              onTranscriptLoad={setTranscript}
            />
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <InfoNotice />
        </div>
      </main>

      <footer className="border-t border-border bg-card py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Built with love using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      <ProfileSetupDialog 
        open={showProfileSetup} 
        onSave={handleProfileSave}
      />
    </div>
  );
}
