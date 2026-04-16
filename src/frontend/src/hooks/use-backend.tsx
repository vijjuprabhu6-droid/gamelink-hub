import { useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { Backend } from "../backend";

export function useBackend(): { backend: Backend | null; isFetching: boolean } {
  const { actor, isFetching } = useActor(createActor);
  return { backend: actor, isFetching };
}
