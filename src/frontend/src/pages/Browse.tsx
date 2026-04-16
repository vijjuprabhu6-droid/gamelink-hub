import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import { Gamepad2, Plus, Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { GameLinkCard } from "../components/GameLinkCard";
import { useAuth } from "../hooks/use-auth";
import { useGameLinks, useSearchGameLinks } from "../hooks/use-game-links";

function CardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border animate-pulse">
      <div className="aspect-video w-full bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-2/3 bg-muted rounded" />
        <div className="flex items-center justify-between mt-1">
          <div className="h-3 w-24 bg-muted rounded" />
          <div className="h-3 w-16 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}

export function BrowsePage() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  // Debounce search input — 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const isSearching = debouncedQuery.length > 0;

  const { data: allGames, isLoading: isLoadingAll } = useGameLinks();
  const { data: searchResults, isLoading: isLoadingSearch } =
    useSearchGameLinks(debouncedQuery);

  const games = isSearching ? (searchResults ?? []) : (allGames ?? []);
  const isLoading = isSearching ? isLoadingSearch : isLoadingAll;

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-card border-b border-border py-16 overflow-hidden">
        {/* Ambient glow blobs */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20 pointer-events-none blur-3xl"
          style={{ background: "oklch(var(--primary))" }}
        />
        <div
          className="absolute -bottom-16 right-0 w-72 h-72 rounded-full opacity-15 pointer-events-none blur-3xl"
          style={{ background: "oklch(var(--accent))" }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-full px-4 py-1.5 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-display font-semibold text-primary uppercase tracking-widest">
              Community Game Discovery
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-foreground leading-[1.05] mb-4">
            Discover Your Next
            <br />
            <span className="text-primary">Favorite Game</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-8">
            Community-curated links to games on Steam, Epic, itch.io and more.
            Find what you love — share what others need.
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg mx-auto mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search games by title or description…"
              className="pl-10 h-12 bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary font-body text-base rounded-xl"
              data-ocid="browse.search_input"
            />
            {inputValue && (
              <button
                type="button"
                onClick={() => setInputValue("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs font-medium px-1.5 transition-smooth"
                aria-label="Clear search"
                data-ocid="browse.search_clear_button"
              >
                ✕
              </button>
            )}
          </div>

          {/* Auth CTA row */}
          {isAuthenticated ? (
            <Button
              asChild
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold gap-1.5 transition-smooth rounded-lg"
              data-ocid="browse.add_game_button"
            >
              <Link to="/add">
                <Plus className="w-4 h-4" />
                Add a Game
              </Link>
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">
              <button
                type="button"
                onClick={login}
                className="text-primary hover:text-primary/80 underline underline-offset-2 transition-smooth font-semibold"
                data-ocid="browse.login_cta_link"
              >
                Sign in
              </button>{" "}
              to submit your own game links to the community
            </p>
          )}
        </div>
      </section>

      {/* Game Grid */}
      <section className="bg-background py-10">
        <div className="container mx-auto px-4">
          {/* Result count when searching */}
          {isSearching && !isLoading && (
            <p
              className="text-sm text-muted-foreground mb-6"
              data-ocid="browse.search_result_count"
            >
              {games.length} result{games.length !== 1 ? "s" : ""} for{" "}
              <span className="text-foreground font-medium">
                &ldquo;{debouncedQuery}&rdquo;
              </span>
            </p>
          )}

          {/* Loading skeletons */}
          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="browse.loading_state"
            >
              {(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((k) => (
                <CardSkeleton key={k} />
              ))}
            </div>
          ) : games.length === 0 ? (
            /* Empty state */
            <div
              className="flex flex-col items-center justify-center py-24 text-center"
              data-ocid="browse.empty_state"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-2xl bg-muted/60 border border-border flex items-center justify-center">
                  <Gamepad2 className="w-12 h-12 text-muted-foreground/50" />
                </div>
                <div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-30 -z-10"
                  style={{ background: "oklch(var(--primary))" }}
                />
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                {isSearching ? "No games found" : "No games yet"}
              </h2>
              <p className="text-muted-foreground mb-7 max-w-sm text-sm leading-relaxed">
                {isSearching
                  ? `No games match "${debouncedQuery}". Try a different search term or browse all games.`
                  : "Be the first to share a game link with the community!"}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                {isSearching && (
                  <Button
                    variant="outline"
                    onClick={() => setInputValue("")}
                    className="border-border text-foreground hover:bg-muted font-display font-semibold"
                    data-ocid="browse.clear_search_button"
                  >
                    Clear Search
                  </Button>
                )}
                {!isSearching &&
                  (isAuthenticated ? (
                    <Button
                      onClick={() => navigate({ to: "/add" })}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold gap-1.5"
                      data-ocid="browse.add_first_game_button"
                    >
                      <Plus className="w-4 h-4" />
                      Add the First Game
                    </Button>
                  ) : (
                    <Button
                      onClick={login}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold"
                      data-ocid="browse.signin_to_add_button"
                    >
                      Sign In to Add a Game
                    </Button>
                  ))}
              </div>
            </div>
          ) : (
            /* Game grid */
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="browse.game_list"
            >
              {games.map((game, i) => (
                <GameLinkCard
                  key={game.id.toString()}
                  game={game}
                  index={i + 1}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
