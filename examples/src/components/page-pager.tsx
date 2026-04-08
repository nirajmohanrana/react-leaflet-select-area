import { ArrowLeft, ArrowRight } from "lucide-react"
import { Link } from "@tanstack/react-router"

import type { SitePage } from "@/content/pages"

type PagePagerProps = {
  previousPage: SitePage | null
  nextPage: SitePage | null
}

export default function PagePager({
  previousPage,
  nextPage,
}: PagePagerProps) {
  if (!previousPage && !nextPage) {
    return null
  }

  return (
    <div className="mt-12 flex items-center justify-between gap-4 border-t border-border/70 pt-6">
      {previousPage ? (
        <Link
          to={previousPage.path}
          className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {previousPage.title}
        </Link>
      ) : (
        <div />
      )}

      {nextPage ? (
        <Link
          to={nextPage.path}
          className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          {nextPage.title}
          <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </div>
  )
}
