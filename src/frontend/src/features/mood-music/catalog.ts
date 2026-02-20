import { Track } from './types';

// Note: Audio files should be placed in frontend/public/assets/audio/
// For demonstration, these tracks use placeholder URLs.
// Replace with actual audio file paths once files are added to the project.

export const musicCatalog: Track[] = [
  {
    id: 'happy-01',
    title: 'Sunshine Melody',
    artist: 'Bright Beats',
    moods: ['Happy', 'Energetic'],
    date: '2026-02-15T10:00:00Z',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 'happy-02',
    title: 'Joyful Journey',
    artist: 'Happy Harmonics',
    moods: ['Happy'],
    date: '2026-02-14T14:30:00Z',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 'calm-01',
    title: 'Peaceful Waters',
    artist: 'Serene Sounds',
    moods: ['Calm'],
    date: '2026-02-13T09:15:00Z',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: 'calm-02',
    title: 'Tranquil Breeze',
    artist: 'Calm Collective',
    moods: ['Calm', 'Sad'],
    date: '2026-02-12T16:45:00Z',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: 'sad-01',
    title: 'Melancholy Nights',
    artist: 'Blue Notes',
    moods: ['Sad'],
    date: '2026-02-11T20:00:00Z',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    id: 'sad-02',
    title: 'Rainy Day Reflections',
    artist: 'Somber Symphony',
    moods: ['Sad', 'Calm'],
    date: '2026-02-10T11:30:00Z',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
  {
    id: 'energetic-01',
    title: 'Power Surge',
    artist: 'Dynamic Duo',
    moods: ['Energetic'],
    date: '2026-02-16T08:00:00Z',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  },
  {
    id: 'energetic-02',
    title: 'Adrenaline Rush',
    artist: 'High Energy',
    moods: ['Energetic', 'Happy'],
    date: '2026-02-09T13:20:00Z',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  },
];
