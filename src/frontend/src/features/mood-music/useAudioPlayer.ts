import { useState, useRef, useEffect } from 'react';
import { Track } from './types';

export function useAudioPlayer() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      console.log('Audio loaded:', audio.src, 'Duration:', audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      console.log('Audio playback ended');
    };

    const handleError = (e: Event) => {
      const errorMsg = `Audio loading error: ${audio.error?.message || 'Unknown error'}`;
      console.error(errorMsg, audio.src);
      setError(errorMsg);
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      console.log('Audio can play:', audio.src);
      setError(null);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setError(null);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const play = async (track: Track) => {
    if (!audioRef.current) {
      console.error('Audio element not initialized');
      return;
    }

    try {
      if (currentTrack?.id !== track.id) {
        console.log('Loading new track:', track.title, track.url);
        audioRef.current.src = track.url;
        setCurrentTrack(track);
        setCurrentTime(0);
        setError(null);
      }

      console.log('Attempting to play:', track.title);
      await audioRef.current.play();
      console.log('Playback started successfully');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to play audio';
      console.error('Play error:', errorMsg, track.url);
      setError(errorMsg);
      setIsPlaying(false);
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    console.log('Pausing playback');
    audioRef.current.pause();
  };

  const togglePlayPause = (track: Track) => {
    if (currentTrack?.id === track.id && isPlaying) {
      pause();
    } else {
      play(track);
    }
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    error,
    play,
    pause,
    togglePlayPause,
    seek,
  };
}
