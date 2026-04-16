import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Link, useNavigate } from "@tanstack/react-router";
import { Gamepad2, Loader2, LogIn, LogOut, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/use-auth";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, isInitializing, isLoggingIn, login, logout } =
    useAuth();
  const navigate = useNavigate();

  const handleAddGame = () => {
    navigate({ to: "/add" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-elevated backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group shrink-0"
            data-ocid="nav.logo.link"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-smooth">
              <Gamepad2 className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-foreground group-hover:text-primary transition-smooth">
              GameLink<span className="text-accent">Hub</span>
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isInitializing ? (
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            ) : isAuthenticated ? (
              <>
                <Button
                  onClick={handleAddGame}
                  size="sm"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold gap-1.5 transition-smooth"
                  data-ocid="nav.add_game_button"
                >
                  <Plus className="w-4 h-4" />
                  Add Game
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  aria-label="Sign Out"
                  className="text-muted-foreground hover:text-foreground gap-1.5 transition-smooth"
                  data-ocid="nav.logout_button"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <Button
                onClick={login}
                size="sm"
                disabled={isLoggingIn}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold gap-1.5 transition-smooth"
                data-ocid="nav.login_button"
              >
                {isLoggingIn ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                <span>Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-smooth font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      <Toaster richColors position="top-right" />
    </div>
  );
}
