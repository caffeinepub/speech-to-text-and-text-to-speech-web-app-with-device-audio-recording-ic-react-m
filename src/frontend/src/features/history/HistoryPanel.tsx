import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useGetTranscriptionHistory, useSaveTranscriptionEntry } from '../../hooks/useQueries';
import { History, Save, AlertCircle, LogIn, Loader2, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface HistoryPanelProps {
  isAuthenticated: boolean;
  currentTranscript: string;
  onTranscriptLoad: (text: string) => void;
}

export default function HistoryPanel({ isAuthenticated, currentTranscript, onTranscriptLoad }: HistoryPanelProps) {
  const { data: history = [], isLoading } = useGetTranscriptionHistory();
  const { mutate: saveEntry, isPending: isSaving } = useSaveTranscriptionEntry();

  const handleSave = () => {
    if (!currentTranscript.trim()) {
      toast.error('No transcript to save');
      return;
    }

    saveEntry(currentTranscript, {
      onSuccess: () => {
        toast.success('Transcript saved successfully');
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to save transcript');
      },
    });
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleString();
  };

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Transcript History
          </CardTitle>
          <CardDescription>View and manage your saved transcripts</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <LogIn className="h-4 w-4" />
            <AlertDescription>
              Please log in to save and view your transcript history.
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
          <History className="w-5 h-5" />
          Transcript History
        </CardTitle>
        <CardDescription>View and manage your saved transcripts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <Button
            onClick={handleSave}
            disabled={!currentTranscript.trim() || isSaving}
            size="lg"
            className="gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Current Transcript
              </>
            )}
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Saved Transcripts</h3>
            <Badge variant="secondary">{history.length} total</Badge>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : history.length === 0 ? (
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                No saved transcripts yet. Save your first transcript to see it here.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3">
              {history
                .slice()
                .reverse()
                .map((entry, index) => (
                  <div
                    key={index}
                    className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => onTranscriptLoad(entry.text)}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <p className="text-xs text-muted-foreground">
                        {formatDate(entry.timestamp)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTranscriptLoad(entry.text);
                          toast.success('Transcript loaded');
                        }}
                      >
                        Load
                      </Button>
                    </div>
                    <p className="text-sm line-clamp-3">{entry.text}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
