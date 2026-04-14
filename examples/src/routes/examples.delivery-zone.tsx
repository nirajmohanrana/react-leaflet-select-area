import { createFileRoute } from "@tanstack/react-router"

import ExampleLayout from "@/components/example-layout"
import { getExamplePage } from "@/content/pages"

export const Route = createFileRoute("/examples/delivery-zone")({
  component: () => (
    <ExampleLayout page={getExamplePage("/examples/delivery-zone")!} />
  ),
})