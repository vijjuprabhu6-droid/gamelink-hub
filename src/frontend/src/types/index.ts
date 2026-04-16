import type { Principal } from "@icp-sdk/core/principal";
import type { ExternalBlob } from "../backend";

export type GameLinkId = bigint;

export interface GameLink {
  id: GameLinkId;
  title: string;
  description: string;
  image: ExternalBlob;
  url: string;
  submittedBy: Principal;
  submittedAt: bigint;
  updatedAt: bigint;
}

export interface CreateGameLinkRequest {
  title: string;
  description: string;
  image: ExternalBlob;
  url: string;
}

export interface UpdateGameLinkRequest {
  title: string;
  description: string;
  image: ExternalBlob;
  url: string;
}
