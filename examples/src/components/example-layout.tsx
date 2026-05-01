import type { ReactNode } from "react"

import { getPageNeighbors, type ExamplePage } from "@/content/pages"
import ContentShell from "@/components/content-shell"
import PagePager from "@/components/page-pager"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type ExampleLayoutProps = {
  page: ExamplePage
  description?: ReactNode
  preview?: ReactNode
}

export default function ExampleLayout({
  page,
  description = page.description,
  preview = page.preview,
}: ExampleLayoutProps) {
  const { previousPage, nextPage } = getPageNeighbors(page.path)

  return (
    <ContentShell sourceHref={page.sourceHref}>
      <div className="mx-auto flex w-full max-w-5xl flex-col pb-14">
        <div className="border-b border-border/70 pb-6">
          <div className="space-y-3">
            <div className="text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase">
              Example
            </div>
            <h1 className="font-heading text-4xl font-semibold tracking-tight">
              {page.title}
            </h1>
            <p className="max-w-3xl text-base text-muted-foreground">
              {page.summary}
            </p>
            {page.tags?.length ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {page.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <section className="mt-8">
          <Card className="gap-0 py-0 overflow-hidden">
            <CardHeader className="px-6 pt-5 pb-4">
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              <div className="h-[76svh] min-h-[34rem] bg-muted/40 md:h-[60vh] md:min-h-[28rem]">
                {preview}
              </div>
            </CardContent>
          </Card>
        </section>

        <article className="prose prose-slate mt-10 max-w-none text-sm prose-headings:font-heading prose-headings:font-semibold prose-pre:rounded-3xl prose-pre:border prose-pre:border-border/70 prose-pre:bg-slate-950 prose-code:before:hidden prose-code:after:hidden dark:prose-invert">
          {description}
        </article>

        <PagePager previousPage={previousPage} nextPage={nextPage} />
      </div>
    </ContentShell>
  )
}
