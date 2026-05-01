import { Link, useRouterState } from "@tanstack/react-router"

import { docsPages, examplePages } from "@/content/pages"
import ShareButton from "@/components/share-button"
import SourceLinkButton from "@/components/source-link-button"
import NpmLinkButton from "@/components/npm-link-button"
import MobileNav from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type AppHeaderProps = {
  sourceHref?: string
}

export default function AppHeader({ sourceHref }: AppHeaderProps) {
  const repositoryHref = "https://github.com/nirajmohanrana/react-leaflet-select-area"
  const effectiveSourceHref = sourceHref ?? repositoryHref

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src="https://react-leaflet.js.org/img/logo-title-alt.svg"
            alt="React Leaflet logo"
            className="h-9 w-auto"
          />
          <Separator orientation="vertical" className="hidden h-8 sm:block" />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">Select Area</div>
            <div className="hidden text-xs text-muted-foreground sm:block">
              Docs and examples for v2.0.2
            </div>
          </div>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          <Button
            asChild
            variant={pathname.startsWith("/docs") ? "secondary" : "ghost"}
            size="sm"
          >
            <Link to="/docs">Docs</Link>
          </Button>
          <Button
            asChild
            variant={pathname.startsWith("/examples") ? "secondary" : "ghost"}
            size="sm"
          >
            <Link to="/examples">Examples</Link>
          </Button>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <NpmLinkButton
            href="https://www.npmjs.com/package/react-leaflet-select-area"
            compact
          />
          <SourceLinkButton href={effectiveSourceHref} compact />
          <ShareButton />
        </div>

        <div className="ml-auto md:hidden">
          <MobileNav
            sourceHref={effectiveSourceHref}
            docsPages={docsPages}
            examplePages={examplePages}
          />
        </div>
      </div>
    </header>
  )
}
