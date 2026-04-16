import type { backendInterface, GameLink, UserRole } from "../backend";
import { ExternalBlob } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleGameLinks: GameLink[] = [
  {
    id: BigInt(0),
    title: "Hollow Knight",
    description: "A challenging 2D action-adventure through a vast, ruined kingdom of insects and heroes. Forge your path through a land of mysteries and discover ancient secrets.",
    url: "https://store.steampowered.com/app/367520/Hollow_Knight/",
    image: ExternalBlob.fromURL("https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg"),
    submittedAt: now - BigInt(86400_000_000_000),
    submittedBy: { toText: () => "2vxsx-fae" } as any,
    updatedAt: now - BigInt(86400_000_000_000),
  },
  {
    id: BigInt(1),
    title: "Celeste",
    description: "Help Madeline survive her inner demons on her journey to the top of Celeste Mountain in this precise platformer with a deeply emotional story.",
    url: "https://store.steampowered.com/app/504230/Celeste/",
    image: ExternalBlob.fromURL("https://cdn.akamai.steamstatic.com/steam/apps/504230/header.jpg"),
    submittedAt: now - BigInt(172800_000_000_000),
    submittedBy: { toText: () => "2vxsx-fae" } as any,
    updatedAt: now - BigInt(172800_000_000_000),
  },
  {
    id: BigInt(2),
    title: "Hades",
    description: "Defy the god of the dead as you hack and slash your way out of the Underworld in this rogue-like dungeon crawler from Supergiant Games.",
    url: "https://store.steampowered.com/app/1145360/Hades/",
    image: ExternalBlob.fromURL("https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg"),
    submittedAt: now - BigInt(259200_000_000_000),
    submittedBy: { toText: () => "2vxsx-fae" } as any,
    updatedAt: now - BigInt(259200_000_000_000),
  },
  {
    id: BigInt(3),
    title: "Stardew Valley",
    description: "You've inherited your grandfather's old farm plot. Armed with hand-me-down tools and a little cash, you set out to begin your new life.",
    url: "https://store.steampowered.com/app/413150/Stardew_Valley/",
    image: ExternalBlob.fromURL("https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg"),
    submittedAt: now - BigInt(345600_000_000_000),
    submittedBy: { toText: () => "2vxsx-fae" } as any,
    updatedAt: now - BigInt(345600_000_000_000),
  },
  {
    id: BigInt(4),
    title: "Disco Elysium",
    description: "A groundbreaking open world role playing game. You are a detective with a unique skill system. No combat — navigate a broken city through dialogue and roleplay.",
    url: "https://store.steampowered.com/app/632470/Disco_Elysium__The_Final_Cut/",
    image: ExternalBlob.fromURL("https://cdn.akamai.steamstatic.com/steam/apps/632470/header.jpg"),
    submittedAt: now - BigInt(432000_000_000_000),
    submittedBy: { toText: () => "2vxsx-fae" } as any,
    updatedAt: now - BigInt(432000_000_000_000),
  },
  {
    id: BigInt(5),
    title: "Undertale",
    description: "The RPG game where you don't have to destroy anyone. Befriend monsters or fight them in this bullet-hell RPG with memorable characters and multiple endings.",
    url: "https://store.steampowered.com/app/391540/Undertale/",
    image: ExternalBlob.fromURL("https://cdn.akamai.steamstatic.com/steam/apps/391540/header.jpg"),
    submittedAt: now - BigInt(518400_000_000_000),
    submittedBy: { toText: () => "2vxsx-fae" } as any,
    updatedAt: now - BigInt(518400_000_000_000),
  },
];

export const mockBackend = {
  addGameLink: async (req) => ({
    id: BigInt(sampleGameLinks.length),
    url: req.url,
    title: req.title,
    description: req.description,
    image: req.image,
    submittedAt: BigInt(Date.now()) * BigInt(1_000_000),
    submittedBy: { toText: () => "2vxsx-fae" } as any,
    updatedAt: BigInt(Date.now()) * BigInt(1_000_000),
  }),
  updateGameLink: async (_id, req) => ({
    id: _id,
    url: req.url,
    title: req.title,
    description: req.description,
    image: req.image,
    submittedAt: now,
    submittedBy: { toText: () => "2vxsx-fae" } as any,
    updatedAt: BigInt(Date.now()) * BigInt(1_000_000),
  }),
  deleteGameLink: async () => undefined,
  getCallerUserRole: async () => "user" as unknown as UserRole,
  getGameLink: async (id) => sampleGameLinks.find((g) => g.id === id) ?? null,
  isCallerAdmin: async () => false,
  listGameLinks: async () => sampleGameLinks,
  searchGameLinks: async (term) =>
    sampleGameLinks.filter(
      (g) =>
        g.title.toLowerCase().includes(term.toLowerCase()) ||
        g.description.toLowerCase().includes(term.toLowerCase())
    ),
  assignCallerUserRole: async () => undefined,
} as unknown as backendInterface;
