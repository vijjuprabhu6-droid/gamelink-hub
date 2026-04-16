import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Clock, ExternalLink, User } from "lucide-react";
import type { GameLink } from "../types";

interface GameLinkCardProps {
  game: GameLink;
  index: number;
}

function formatTimeAgo(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  const now = Date.now();
  const diff = now - ms;
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (months > 0) return `${months}mo ago`;
  if (weeks > 0) return `${weeks}w ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}

function truncatePrincipal(principal: { toString: () => string }): string {
  const str = principal.toString();
  if (str.length <= 12) return str;
  return `${str.slice(0, 5)}…${str.slice(-4)}`;
}

export function GameLinkCard({ game, index }: GameLinkCardProps) {
  const imageUrl =
    (game.image as { getDirectURL?: () => string } | null)?.getDirectURL?.() ??
    "/assets/images/placeholder.svg";

  return (
    <Card
      className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-smooth shadow-subtle hover:shadow-elevated cursor-pointer flex flex-col rounded-xl"
      data-ocid={`game.item.${index}`}
    >
      {/* Thumbnail — clicking navigates to game detail */}
      <Link
        to="/game/$id"
        params={{ id: game.id.toString() }}
        className="block overflow-hidden"
        aria-label={`View details for ${game.title}`}
        data-ocid={`game.card_link.${index}`}
      >
        <div className="relative w-full aspect-video overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={game.title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-[1.04]"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
          {/* Gradient overlay with hover reveal */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
          {/* "View" pill on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
            <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-display font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              View Game
            </span>
          </div>
        </div>
      </Link>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title + description */}
        <div className="flex-1 min-w-0">
          <Link
            to="/game/$id"
            params={{ id: game.id.toString() }}
            className="block"
            data-ocid={`game.title_link.${index}`}
          >
            <h3 className="font-display font-bold text-foreground text-base leading-snug line-clamp-2 group-hover:text-primary transition-smooth mb-1.5">
              {game.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 min-w-0">
            {game.description}
          </p>
        </div>

        {/* Meta row: submitter + timestamp */}
        <div className="flex items-center justify-between gap-2 min-w-0">
          <span
            className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0"
            title={game.submittedBy.toString()}
          >
            <User className="w-3 h-3 shrink-0 text-primary/70" />
            <span className="font-mono text-[10px] truncate">
              {truncatePrincipal(game.submittedBy)}
            </span>
          </span>
          <Badge
            variant="secondary"
            className="text-[10px] h-4 px-1.5 shrink-0 gap-0.5 border-border/50"
          >
            <Clock className="w-2.5 h-2.5" />
            {formatTimeAgo(game.submittedAt)}
          </Badge>
        </div>

        {/* External store link — opens in new tab */}
        <a
          href={game.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-1.5 w-full h-8 rounded-lg bg-accent/10 border border-accent/25 text-accent hover:bg-accent hover:text-accent-foreground text-xs font-display font-semibold transition-smooth"
          data-ocid={`game.visit_button.${index}`}
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          Visit on Store
        </a>
      </div>
    </Card>
  );
}
