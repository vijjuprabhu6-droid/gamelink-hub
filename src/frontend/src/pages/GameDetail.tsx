import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  Edit2,
  ExternalLink,
  Gamepad2,
  Trash2,
  User2,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useAuth } from "../hooks/use-auth";
import { useDeleteGameLink, useGameLink } from "../hooks/use-game-links";

function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp) / 1_000_000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function truncatePrincipal(p: string): string {
  if (p.length <= 12) return p;
  return `${p.slice(0, 6)}…${p.slice(-4)}`;
}

export function GameDetailPage() {
  const { id } = useParams({ from: "/game/$id" });
  const navigate = useNavigate();
  const { isAuthenticated, principal } = useAuth();
  const { data: game, isLoading } = useGameLink(id ? BigInt(id) : undefined);
  const deleteGame = useDeleteGameLink();

  const imageUrl =
    (
      game?.image as { getDirectURL?: () => string } | undefined
    )?.getDirectURL?.() ?? "/assets/images/placeholder.svg";

  const isOwner =
    isAuthenticated &&
    principal &&
    game &&
    principal.toString() === game.submittedBy.toString();

  const handleDelete = async () => {
    if (!game) return;
    try {
      await deleteGame.mutateAsync(game.id);
      toast.success("Game link deleted");
      navigate({ to: "/" });
    } catch {
      toast.error("Failed to delete game link");
    }
  };

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div
        className="max-w-4xl mx-auto px-4 py-10"
        data-ocid="game_detail.loading_state"
      >
        <Skeleton className="h-5 w-28 mb-6 rounded-full" />
        <Skeleton className="w-full aspect-video rounded-2xl mb-8" />
        <Skeleton className="h-10 w-2/3 mb-3" />
        <div className="flex gap-3 mb-5">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-36 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-4/5 mb-8" />
        <Skeleton className="h-14 w-52 rounded-xl" />
      </div>
    );
  }

  // ── Not found ───────────────────────────────────────────────────────────────
  if (!game) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center"
        data-ocid="game_detail.error_state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          <div className="absolute inset-0 rounded-full bg-destructive/5 blur-2xl -z-10" />
        </div>
        <h2 className="font-display font-bold text-3xl text-foreground mb-3">
          Game Not Found
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-sm">
          This game link may have been removed or never existed. Check the URL
          and try again.
        </p>
        <Button
          asChild
          variant="outline"
          className="gap-2 transition-smooth"
          data-ocid="game_detail.back_link"
        >
          <Link to="/">
            <ArrowLeft className="w-4 h-4" />
            Back to Browse
          </Link>
        </Button>
      </motion.div>
    );
  }

  // ── Main detail ─────────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" data-ocid="game_detail.page">
      {/* Back nav */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6 group"
          data-ocid="game_detail.back_link"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-smooth" />
          Back to Browse
        </Link>
      </motion.div>

      {/* Hero image */}
      <motion.div
        className="relative rounded-2xl overflow-hidden border border-border mb-8 shadow-elevated group"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <img
          src={imageUrl}
          alt={game.title}
          className="w-full aspect-video object-cover transition-smooth group-hover:scale-[1.02]"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
        {/* Glow badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary/80 text-primary-foreground border-primary/50 backdrop-blur-sm gap-1.5 text-xs font-display font-semibold uppercase tracking-wider">
            <Gamepad2 className="w-3 h-3" />
            Game
          </Badge>
        </div>
      </motion.div>

      {/* Content area */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        {/* Title row + owner actions */}
        <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground flex-1 min-w-0 leading-tight">
            {game.title}
          </h1>

          {isOwner && (
            <div
              className="flex items-center gap-2 shrink-0 pt-1"
              data-ocid="game_detail.owner_actions"
            >
              <Button
                asChild
                variant="outline"
                size="sm"
                className="gap-1.5 border-primary/40 hover:border-primary hover:bg-primary/10 text-primary transition-smooth"
                data-ocid="game_detail.edit_button"
              >
                <Link to="/edit/$id" params={{ id: game.id.toString() }}>
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </Link>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-1.5 transition-smooth"
                    data-ocid="game_detail.delete_button"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent
                  className="bg-card border-border"
                  data-ocid="game_detail.dialog"
                >
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-display font-bold text-xl">
                      Delete Game Link
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                      Are you sure you want to delete{" "}
                      <span className="text-foreground font-semibold">
                        &ldquo;{game.title}&rdquo;
                      </span>
                      ? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      className="transition-smooth"
                      data-ocid="game_detail.cancel_button"
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={deleteGame.isPending}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-smooth"
                      data-ocid="game_detail.confirm_button"
                    >
                      {deleteGame.isPending ? "Deleting…" : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>

        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2 mb-7">
          <Badge
            variant="secondary"
            className="gap-1.5 px-3 py-1 text-xs font-mono"
          >
            <User2 className="w-3 h-3 shrink-0 text-primary" />
            <span>{truncatePrincipal(game.submittedBy.toString())}</span>
          </Badge>
          <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs">
            <CalendarDays className="w-3 h-3 shrink-0 text-primary" />
            <span>{formatDate(game.submittedAt)}</span>
          </Badge>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-7" />

        {/* Description */}
        <p className="text-foreground/80 leading-relaxed text-base mb-10 whitespace-pre-wrap">
          {game.description}
        </p>

        {/* Primary CTA — orange/accent with glow */}
        <a
          href={game.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-lg bg-accent text-accent-foreground glow-accent hover:scale-[1.03] hover:brightness-110 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          data-ocid="game_detail.visit_button"
          aria-label={`Open ${game.title} in a new tab`}
        >
          <ExternalLink className="w-5 h-5" />
          Play / View Game
        </a>
      </motion.div>
    </div>
  );
}
