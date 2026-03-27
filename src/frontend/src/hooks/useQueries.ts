import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useListReviews() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAverageRating() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["averageRating"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAverageRating();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIncrementDownload() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      await actor.incrementDownloadCount();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["downloadCountDisplay"] });
    },
  });
}

export function useSubmitReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      rating,
      reviewText,
    }: { rating: bigint; reviewText: string }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitReview(rating, reviewText);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["averageRating"] });
    },
  });
}

export function useRegister() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      username,
      email,
    }: { username: string; email: string | null }) => {
      if (!actor) throw new Error("Not connected");
      return actor.register(username, email);
    },
  });
}
