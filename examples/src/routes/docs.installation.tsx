import { createFileRoute } from "@tanstack/react-router"

import { getDocsPage } from "@/content/pages"
import DocsLayout from "@/components/docs-layout"

export const Route = createFileRoute("/docs/installation")({
  component: RouteComponent,
})

function RouteComponent() {
  return <DocsLayout page={getDocsPage("/docs/installation")!} />
}
