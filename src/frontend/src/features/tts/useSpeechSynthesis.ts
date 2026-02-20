import { useState, useEffect, useCallback } from 'react';

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const synth = window.speechSynthesis;
    setIsSupported(!!synth);

    if (synth) {
      const loadVoices = () => {
        const availableVoices = synth.getVoices();
        setVoices(availableVoices);
        if (availableVoices.length > 0 && !selectedVoice) {
          const defaultVoice = availableVoices.find((v) => v.default) || availableVoices[0];
          setSelectedVoice(defaultVoice);
        }
      };

      loadVoices();
      synth.onvoiceschanged = loadVoices;
    }
  }, [selectedVoice]);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported || !text.trim()) return;

      const synth = window.speechSynthesis;
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.rate = rate;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synth.speak(utterance);
    },
    [isSupported, selectedVoice, rate]
  );

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return {
    isSpeaking,
    isSupported,
    voices,
    selectedVoice,
    rate,
    setSelectedVoice,
    setRate,
    speak,
    stop,
  };
}
