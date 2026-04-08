import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"

import { examplePages } from "@/content/pages"
import ContentShell from "@/components/content-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const Route = createFileRoute("/examples/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ContentShell>
      <div className="mx-auto w-full max-w-5xl space-y-6 pb-14">
        <div className="space-y-3 border-b border-border/70 pb-6">
          <div className="text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase">
            Examples
          </div>
          <h1 className="font-heading text-4xl font-semibold tracking-tight">
            Real-world usage patterns
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            This section is reserved for concrete product scenarios. More
            examples will be added over time as the package grows.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {examplePages.map((page) => (
            <Card key={page.path} className="overflow-hidden">
              <CardHeader className="space-y-3">
                <CardTitle>{page.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{page.summary}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {page.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button asChild>
                  <Link to={page.path}>
                    Open example
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ContentShell>
  )
}
