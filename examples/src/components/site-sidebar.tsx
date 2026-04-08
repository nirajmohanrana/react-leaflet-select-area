import { Link, useRouterState } from "@tanstack/react-router"

import { siteNavigation } from "@/content/pages"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function SiteSidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  return (
    <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-64 shrink-0 border-r border-border/70 lg:block">
      <ScrollArea className="h-full">
        <div className="space-y-6 px-4 py-6">
          {siteNavigation.map((group) => (
            <div key={group.title} className="space-y-2">
              <div className="px-2 text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase">
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((page) => {
                  const isActive = pathname === page.path

                  return (
                    <Link
                      key={page.path}
                      to={page.path}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-muted font-medium text-foreground"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                      )}
                    >
                      {page.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}
