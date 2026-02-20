export type Mood = 'Happy' | 'Calm' | 'Sad' | 'Energetic';

export type SortMode = 'default' | 'latest';

export interface Track {
  id: string;
  title: string;
  artist: string;
  moods: Mood[];
  date: string; // ISO date string
  url: string;
}
