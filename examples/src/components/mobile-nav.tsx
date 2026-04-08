import { Settings2 } from "lucide-react"
import { Link, useRouterState } from "@tanstack/react-router"

import type { SitePage } from "@/content/pages"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import ShareButton from "@/components/share-button"
import SourceLinkButton from "@/components/source-link-button"

type MobileNavProps = {
  sourceHref?: string
  docsPages: SitePage[]
  examplePages: SitePage[]
}

export default function MobileNav({
  sourceHref,
  docsPages,
  examplePages,
}: MobileNavProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Settings2 className="size-4" />
          <span className="sr-only">Open navigation</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Navigate</DrawerTitle>
          <DrawerDescription>
            Jump between docs, examples, and the package overview.
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 px-4 pb-6">
          <div className="grid gap-2">
            <DrawerClose asChild>
              <Button
                asChild
                variant={pathname === "/" ? "secondary" : "ghost"}
                className="justify-start"
              >
                <Link to="/">Overview</Link>
              </Button>
            </DrawerClose>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Docs
            </div>
            <div className="grid gap-2">
              {docsPages.map((page) => (
                <DrawerClose asChild key={page.path}>
                  <Button
                    asChild
                    variant={pathname === page.path ? "secondary" : "ghost"}
                    className="justify-start"
                  >
                    <Link to={page.path}>{page.title}</Link>
                  </Button>
                </DrawerClose>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Examples
            </div>
            <div className="grid gap-2">
              <DrawerClose asChild>
                <Button
                  asChild
                  variant={pathname === "/examples" ? "secondary" : "ghost"}
                  className="justify-start"
                >
                  <Link to="/examples">All Examples</Link>
                </Button>
              </DrawerClose>
              {examplePages.map((page) => (
                <DrawerClose asChild key={page.path}>
                  <Button
                    asChild
                    variant={pathname === page.path ? "secondary" : "ghost"}
                    className="justify-start"
                  >
                    <Link to={page.path}>{page.title}</Link>
                  </Button>
                </DrawerClose>
              ))}
            </div>
          </div>

          {(sourceHref || pathname !== "/") && (
            <>
              <Separator />
              <div className="flex gap-2">
                {sourceHref ? <SourceLinkButton href={sourceHref} /> : null}
                <ShareButton />
              </div>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
