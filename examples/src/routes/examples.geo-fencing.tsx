import { createFileRoute } from "@tanstack/react-router"

import ExampleLayout from "@/components/example-layout"
import { getExamplePage } from "@/content/pages"

export const Route = createFileRoute("/examples/geo-fencing")({
  component: RouteComponent,
})

function RouteComponent() {
  return <ExampleLayout page={getExamplePage("/examples/geo-fencing")!} />
}
