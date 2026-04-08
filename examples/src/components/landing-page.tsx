import { ArrowRight, BookOpenText, Blocks, Sparkles } from "lucide-react"
import { Link } from "@tanstack/react-router"

import GeoFencingExample from "@/components/examples/geo-fencing-example"
import { docsPages, examplePages } from "@/content/pages"
import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function LandingPage() {
  return (
    <div className="min-h-svh bg-[radial-gradient(circle_at_top_left,_color-mix(in_oklab,var(--primary)_18%,transparent),transparent_24%),radial-gradient(circle_at_bottom_right,_color-mix(in_oklab,var(--accent-foreground)_8%,transparent),transparent_22%),linear-gradient(180deg,color-mix(in_oklab,var(--background)_94%,white_6%),var(--background))]">
      <AppHeader />

      <main className="mx-auto flex max-w-7xl flex-col gap-8 p-4 md:p-6">
        <section className="space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="space-y-6 pt-8 md:pt-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="size-3.5 text-primary" />
                React Leaflet selection, updated for mobile and touch
              </div>

              <div className="space-y-4">
                <h1 className="max-w-4xl font-heading text-4xl font-semibold tracking-tight md:text-[3.35rem] md:leading-[1.02]">
                  Select map areas with a built-in control or your own app UI.
                </h1>
                <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
                  `react-leaflet-select-area` adds rectangular area selection to
                  React Leaflet with desktop shortcut support, one-shot touch
                  selection, and an external controller pattern for custom
                  workflows.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/docs">
                    Start with docs
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/examples">Browse examples</Link>
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-border bg-background/80 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <BookOpenText className="size-4 text-primary" />
                    Docs
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Learn how the package works, how to mount it, and how to
                    drive selection with the controller API.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-background/80 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Blocks className="size-4 text-primary" />
                    Examples
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Explore real-world usage patterns and complete demos you can
                    adapt for your own product.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              <div className="h-[62vh] min-h-[32rem] bg-muted/40 lg:h-[44rem]">
                <GeoFencingExample controlMode="external" />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card size="sm">
            <CardHeader>
              <CardTitle>Docs Pages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {docsPages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="block rounded-2xl border border-border bg-background/80 p-4 transition-colors hover:bg-muted/60"
                >
                  <div className="font-medium">{page.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {page.summary}
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                to="/examples"
                className="block rounded-2xl border border-border bg-background/80 p-4 transition-colors hover:bg-muted/60"
              >
                <div className="font-medium">Examples Index</div>
                <div className="text-sm text-muted-foreground">
                  A growing collection of real-world use cases.
                </div>
              </Link>
              {examplePages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="block rounded-2xl border border-border bg-background/80 p-4 transition-colors hover:bg-muted/60"
                >
                  <div className="font-medium">{page.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {page.summary}
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
