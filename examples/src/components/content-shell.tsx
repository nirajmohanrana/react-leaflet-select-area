import type { ReactNode } from "react"

import AppHeader from "@/components/app-header"
import SiteSidebar from "@/components/site-sidebar"

type ContentShellProps = {
  children: ReactNode
  sourceHref?: string
}

export default function ContentShell({
  children,
  sourceHref,
}: ContentShellProps) {
  return (
    <div className="min-h-svh bg-[radial-gradient(circle_at_top_left,_color-mix(in_oklab,var(--primary)_14%,transparent),transparent_28%),linear-gradient(180deg,color-mix(in_oklab,var(--background)_92%,white_8%),var(--background))]">
      <AppHeader sourceHref={sourceHref} />
      <main className="mx-auto flex max-w-7xl">
        <SiteSidebar />
        <div className="min-w-0 flex-1 px-4 py-6 md:px-6">{children}</div>
      </main>
    </div>
  )
}
