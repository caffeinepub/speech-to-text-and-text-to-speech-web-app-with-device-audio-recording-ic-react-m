import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, TranscriptEntry } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: (_, profile) => {
      // Immediately update the cache with the new profile
      queryClient.setQueryData(['currentUserProfile'], profile);
      // Also invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useSaveTranscriptionEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (text: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveTranscriptionEntry(text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transcriptionHistory'] });
    },
  });
}

export function useGetTranscriptionHistory() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TranscriptEntry[]>({
    queryKey: ['transcriptionHistory'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTranscriptionHistory();
    },
    enabled: !!actor && !actorFetching,
  });
}
