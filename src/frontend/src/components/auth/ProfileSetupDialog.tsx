import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ProfileSetupDialogProps {
  open: boolean;
  onSave: (name: string) => void;
}

export default function ProfileSetupDialog({ open, onSave }: ProfileSetupDialogProps) {
  const [name, setName] = useState('Alhat Rutuja');

  // Reset to default name when dialog opens
  useEffect(() => {
    if (open) {
      setName('Alhat Rutuja');
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Welcome to Mood Based Music</DialogTitle>
            <DialogDescription>
              Please enter your name to complete your profile setup.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="name" className="mb-2 block">
              Your Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              autoFocus
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!name.trim()}>
              Save Profile
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
