import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, r as reactExports, u as useAuth, a as useNavigate, B as Button, P as Plus, G as Gamepad2 } from "./index-m1b7ux88.js";
import { C as Card, I as Input } from "./card-BiIrcdLu.js";
import { B as Badge, E as ExternalLink } from "./badge-Oz5EYX7t.js";
import { u as useGameLinks, a as useSearchGameLinks } from "./use-game-links-DVa0Tj36.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function formatTimeAgo(timestamp) {
  const ms = Number(timestamp) / 1e6;
  const now = Date.now();
  const diff = now - ms;
  const minutes = Math.floor(diff / 6e4);
  const hours = Math.floor(diff / 36e5);
  const days = Math.floor(diff / 864e5);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  if (months > 0) return `${months}mo ago`;
  if (weeks > 0) return `${weeks}w ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}
function truncatePrincipal(principal) {
  const str = principal.toString();
  if (str.length <= 12) return str;
  return `${str.slice(0, 5)}…${str.slice(-4)}`;
}
function GameLinkCard({ game, index }) {
  var _a, _b;
  const imageUrl = ((_b = (_a = game.image) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a)) ?? "/assets/images/placeholder.svg";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-smooth shadow-subtle hover:shadow-elevated cursor-pointer flex flex-col rounded-xl",
      "data-ocid": `game.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/game/$id",
            params: { id: game.id.toString() },
            className: "block overflow-hidden",
            "aria-label": `View details for ${game.title}`,
            "data-ocid": `game.card_link.${index}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full aspect-video overflow-hidden bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imageUrl,
                  alt: game.title,
                  className: "w-full h-full object-cover transition-smooth group-hover:scale-[1.04]",
                  onError: (e) => {
                    e.target.src = "/assets/images/placeholder.svg";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-display font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5", children: "View Game" }) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-4 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/game/$id",
                params: { id: game.id.toString() },
                className: "block",
                "data-ocid": `game.title_link.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-base leading-snug line-clamp-2 group-hover:text-primary transition-smooth mb-1.5", children: game.title })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-2 min-w-0", children: game.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "flex items-center gap-1.5 text-xs text-muted-foreground min-w-0",
                title: game.submittedBy.toString(),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 shrink-0 text-primary/70" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] truncate", children: truncatePrincipal(game.submittedBy) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "secondary",
                className: "text-[10px] h-4 px-1.5 shrink-0 gap-0.5 border-border/50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-2.5 h-2.5" }),
                  formatTimeAgo(game.submittedAt)
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: game.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: (e) => e.stopPropagation(),
              className: "flex items-center justify-center gap-1.5 w-full h-8 rounded-lg bg-accent/10 border border-accent/25 text-accent hover:bg-accent hover:text-accent-foreground text-xs font-display font-semibold transition-smooth",
              "data-ocid": `game.visit_button.${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5 shrink-0" }),
                "Visit on Store"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function CardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden bg-card border border-border animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video w-full bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-3/4 bg-muted rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-full bg-muted rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-2/3 bg-muted rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-24 bg-muted rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-16 bg-muted rounded" })
      ] })
    ] })
  ] });
}
function BrowsePage() {
  const [inputValue, setInputValue] = reactExports.useState("");
  const [debouncedQuery, setDebouncedQuery] = reactExports.useState("");
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue]);
  const isSearching = debouncedQuery.length > 0;
  const { data: allGames, isLoading: isLoadingAll } = useGameLinks();
  const { data: searchResults, isLoading: isLoadingSearch } = useSearchGameLinks(debouncedQuery);
  const games = isSearching ? searchResults ?? [] : allGames ?? [];
  const isLoading = isSearching ? isLoadingSearch : isLoadingAll;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative bg-card border-b border-border py-16 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20 pointer-events-none blur-3xl",
          style: { background: "oklch(var(--primary))" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute -bottom-16 right-0 w-72 h-72 rounded-full opacity-15 pointer-events-none blur-3xl",
          style: { background: "oklch(var(--accent))" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-full px-4 py-1.5 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display font-semibold text-primary uppercase tracking-widest", children: "Community Game Discovery" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-extrabold text-4xl md:text-6xl text-foreground leading-[1.05] mb-4", children: [
          "Discover Your Next",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Favorite Game" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-8", children: "Community-curated links to games on Steam, Epic, itch.io and more. Find what you love — share what others need." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-lg mx-auto mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: inputValue,
              onChange: (e) => setInputValue(e.target.value),
              placeholder: "Search games by title or description…",
              className: "pl-10 h-12 bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary font-body text-base rounded-xl",
              "data-ocid": "browse.search_input"
            }
          ),
          inputValue && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setInputValue(""),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs font-medium px-1.5 transition-smooth",
              "aria-label": "Clear search",
              "data-ocid": "browse.search_clear_button",
              children: "✕"
            }
          )
        ] }),
        isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "sm",
            className: "bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold gap-1.5 transition-smooth rounded-lg",
            "data-ocid": "browse.add_game_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/add", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Add a Game"
            ] })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: login,
              className: "text-primary hover:text-primary/80 underline underline-offset-2 transition-smooth font-semibold",
              "data-ocid": "browse.login_cta_link",
              children: "Sign in"
            }
          ),
          " ",
          "to submit your own game links to the community"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      isSearching && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "p",
        {
          className: "text-sm text-muted-foreground mb-6",
          "data-ocid": "browse.search_result_count",
          children: [
            games.length,
            " result",
            games.length !== 1 ? "s" : "",
            " for",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
              "“",
              debouncedQuery,
              "”"
            ] })
          ]
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          "data-ocid": "browse.loading_state",
          children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, k))
        }
      ) : games.length === 0 ? (
        /* Empty state */
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-24 text-center",
            "data-ocid": "browse.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-2xl bg-muted/60 border border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "w-12 h-12 text-muted-foreground/50" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-0 rounded-2xl blur-xl opacity-30 -z-10",
                    style: { background: "oklch(var(--primary))" }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: isSearching ? "No games found" : "No games yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-7 max-w-sm text-sm leading-relaxed", children: isSearching ? `No games match "${debouncedQuery}". Try a different search term or browse all games.` : "Be the first to share a game link with the community!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-center", children: [
                isSearching && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => setInputValue(""),
                    className: "border-border text-foreground hover:bg-muted font-display font-semibold",
                    "data-ocid": "browse.clear_search_button",
                    children: "Clear Search"
                  }
                ),
                !isSearching && (isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: () => navigate({ to: "/add" }),
                    className: "bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold gap-1.5",
                    "data-ocid": "browse.add_first_game_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                      "Add the First Game"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: login,
                    className: "bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold",
                    "data-ocid": "browse.signin_to_add_button",
                    children: "Sign In to Add a Game"
                  }
                ))
              ] })
            ]
          }
        )
      ) : (
        /* Game grid */
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
            "data-ocid": "browse.game_list",
            children: games.map((game, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              GameLinkCard,
              {
                game,
                index: i + 1
              },
              game.id.toString()
            ))
          }
        )
      )
    ] }) })
  ] });
}
export {
  BrowsePage
};
