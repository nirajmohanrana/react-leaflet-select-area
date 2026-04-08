import { createFileRoute } from "@tanstack/react-router"

import ExampleLayout from "@/components/example-layout"
import { getExamplePage } from "@/content/pages"

export const Route = createFileRoute("/examples/marker-group-move")({
  component: RouteComponent,
})

function RouteComponent() {
  return <ExampleLayout page={getExamplePage("/examples/marker-group-move")!} />
}
