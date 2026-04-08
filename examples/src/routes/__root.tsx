import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { Analytics } from "@vercel/analytics/react"

import { Button } from "@/components/ui/button"

function NotFound() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-6">
      <div className="space-y-4 text-center">
        <h1 className="font-heading text-3xl font-semibold">Page not found</h1>
        <p className="text-sm text-muted-foreground">
          The docs route you requested does not exist.
        </p>
        <Button asChild>
          <Link to="/">Back to docs</Link>
        </Button>
      </div>
    </div>
  )
}

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Analytics />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
  notFoundComponent: NotFound,
})
