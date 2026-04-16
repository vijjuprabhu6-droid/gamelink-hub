import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CreateGameLinkRequest,
  GameLink,
  GameLinkId,
  UpdateGameLinkRequest,
} from "../types";
import { useBackend } from "./use-backend";

const QUERY_KEY = "gameLinks";

export function useGameLinks() {
  const { backend, isFetching } = useBackend();

  return useQuery<GameLink[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      if (!backend) return [];
      return (
        backend as unknown as { listGameLinks: () => Promise<GameLink[]> }
      ).listGameLinks();
    },
    enabled: !!backend && !isFetching,
  });
}

export function useSearchGameLinks(query: string) {
  const { backend, isFetching } = useBackend();

  return useQuery<GameLink[]>({
    queryKey: [QUERY_KEY, "search", query],
    queryFn: async () => {
      if (!backend || !query.trim()) return [];
      return (
        backend as unknown as {
          searchGameLinks: (q: string) => Promise<GameLink[]>;
        }
      ).searchGameLinks(query);
    },
    enabled: !!backend && !isFetching && !!query.trim(),
  });
}

export function useGameLink(id: GameLinkId | undefined) {
  const { backend, isFetching } = useBackend();

  return useQuery<GameLink | null>({
    queryKey: [QUERY_KEY, id?.toString()],
    queryFn: async () => {
      if (!backend || id === undefined) return null;
      return (
        backend as unknown as {
          getGameLink: (id: GameLinkId) => Promise<GameLink | null>;
        }
      ).getGameLink(id);
    },
    enabled: !!backend && !isFetching && id !== undefined,
  });
}

export function useAddGameLink() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();

  return useMutation<GameLink, Error, CreateGameLinkRequest>({
    mutationFn: async (req) => {
      if (!backend) throw new Error("Backend not available");
      return (
        backend as unknown as {
          addGameLink: (req: CreateGameLinkRequest) => Promise<GameLink>;
        }
      ).addGameLink(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useUpdateGameLink() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();

  return useMutation<
    GameLink,
    Error,
    { id: GameLinkId; request: UpdateGameLinkRequest }
  >({
    mutationFn: async ({ id, request }) => {
      if (!backend) throw new Error("Backend not available");
      return (
        backend as unknown as {
          updateGameLink: (
            id: GameLinkId,
            req: UpdateGameLinkRequest,
          ) => Promise<GameLink>;
        }
      ).updateGameLink(id, request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useDeleteGameLink() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();

  return useMutation<void, Error, GameLinkId>({
    mutationFn: async (id) => {
      if (!backend) throw new Error("Backend not available");
      return (
        backend as unknown as {
          deleteGameLink: (id: GameLinkId) => Promise<void>;
        }
      ).deleteGameLink(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}
