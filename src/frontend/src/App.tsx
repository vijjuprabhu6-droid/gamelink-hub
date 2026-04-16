import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { useAuth } from "./hooks/use-auth";

// Lazy-loaded pages
const BrowsePage = lazy(() =>
  import("./pages/Browse").then((m) => ({ default: m.BrowsePage })),
);
const GameDetailPage = lazy(() =>
  import("./pages/GameDetail").then((m) => ({ default: m.GameDetailPage })),
);
const AddGamePage = lazy(() =>
  import("./pages/AddGame").then((m) => ({ default: m.AddGamePage })),
);
const EditGamePage = lazy(() =>
  import("./pages/EditGame").then((m) => ({ default: m.EditGamePage })),
);

// Page loading fallback
function PageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-6">
      <Skeleton className="h-10 w-64" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] as const).map(
          (k) => (
            <Skeleton key={k} className="aspect-[3/4] rounded-lg" />
          ),
        )}
      </div>
    </div>
  );
}

// Root layout component
function RootLayout() {
  return (
    <Layout>
      <Suspense fallback={<PageSkeleton />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

// Route definitions
const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: BrowsePage,
});

const gameDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/game/$id",
  component: GameDetailPage,
});

const addGameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add",
  component: AddGamePage,
});

const editGameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/edit/$id",
  component: EditGamePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  gameDetailRoute,
  addGameRoute,
  editGameRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
