import type { ReactNode } from "react"

import { getPageNeighbors, type DocsPage } from "@/content/pages"
import ContentShell from "@/components/content-shell"
import PagePager from "@/components/page-pager"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

type DocsLayoutProps = {
  page: DocsPage
  description?: ReactNode
  preview?: ReactNode
}

export default function DocsLayout({
  page,
  description = page.description,
  preview = page.preview,
}: DocsLayoutProps) {
  const { previousPage, nextPage } = getPageNeighbors(page.path)

  return (
    <ContentShell sourceHref={page.sourceHref}>
      <div className="mx-auto flex w-full max-w-4xl flex-col pb-14">
        <div className="border-b border-border/70 pb-6">
          <div className="space-y-1">
            <div className="text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase">
              Docs
            </div>
            <h1 className="font-heading text-4xl font-semibold tracking-tight">
              {page.title}
            </h1>
            <p className="max-w-3xl text-base text-muted-foreground">
              {page.summary}
            </p>
          </div>
        </div>

        {preview ? (
          <section className="mt-8">
            <Card className="gap-0 py-0 overflow-hidden">
              <CardHeader className="px-6 pt-5 pb-4">
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="p-0">
                <div
                  className={cn(
                    "h-[22rem] bg-muted/40",
                    page.previewClassName
                  )}
                >
                  {preview}
                </div>
              </CardContent>
            </Card>
          </section>
        ) : null}

        <article className="prose mt-10 max-w-none text-sm prose-slate dark:prose-invert prose-headings:font-heading prose-headings:font-semibold prose-code:before:hidden prose-code:after:hidden prose-pre:rounded-3xl prose-pre:border prose-pre:border-border/70 prose-pre:bg-slate-950">
          {description}
        </article>

        <PagePager previousPage={previousPage} nextPage={nextPage} />
      </div>
    </ContentShell>
  )
}
