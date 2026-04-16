import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface UpdateGameLinkRequest {
    url: string;
    title: string;
    description: string;
    image: ExternalBlob;
}
export type GameLinkId = bigint;
export interface GameLink {
    id: GameLinkId;
    url: string;
    title: string;
    submittedAt: bigint;
    submittedBy: Principal;
    description: string;
    updatedAt: bigint;
    image: ExternalBlob;
}
export interface CreateGameLinkRequest {
    url: string;
    title: string;
    description: string;
    image: ExternalBlob;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGameLink(req: CreateGameLinkRequest): Promise<GameLink>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteGameLink(id: GameLinkId): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getGameLink(id: GameLinkId): Promise<GameLink | null>;
    isCallerAdmin(): Promise<boolean>;
    listGameLinks(): Promise<Array<GameLink>>;
    searchGameLinks(term: string): Promise<Array<GameLink>>;
    updateGameLink(id: GameLinkId, req: UpdateGameLinkRequest): Promise<GameLink>;
}
