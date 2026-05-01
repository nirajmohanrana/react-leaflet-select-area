import type { ReactNode } from "react"

import ApiDoc from "@/content/docs/api.mdx"
import BasicDoc from "@/content/docs/basic.mdx"
import GettingStartedDoc from "@/content/docs/getting-started.mdx"
import InstallationDoc from "@/content/docs/installation.mdx"
import MobileSelectionDoc from "@/content/docs/mobile-selection.mdx"
import ExternalControllerDoc from "@/content/docs/external-controller.mdx"
import StylingDoc from "@/content/docs/styling.mdx"
import BasicExample from "@/components/examples/basic-example"
import GettingStartedExample from "@/components/examples/getting-started-example"
import MapSectionDownloadDescription from "@/components/examples/map-section-download-description"
import MapSectionDownloadExample from "@/components/examples/map-section-download-example"
import MarkerGroupMoveDescription from "@/components/examples/marker-group-move-description"
import MarkerGroupMoveExample from "@/components/examples/marker-group-move-example"
import GeoFencingDescription from "@/components/examples/geo-fencing-description"
import GeoFencingExample from "@/components/examples/geo-fencing-example"
import BatchGeocodingDescription from "@/components/examples/batch-geocoding-description"
import BatchGeocodingExample from "@/components/examples/batch-geocoding-example"
import DeliveryZoneDescription from "@/components/examples/delivery-zone-description"
import DeliveryZoneExample from "@/components/examples/delivery-zone-example"
import PropertySearchDescription from "@/components/examples/property-search-description"
import PropertySearchExample from "@/components/examples/property-search-example"
import RoutePlanningDescription from "@/components/examples/route-planning-description"
import RoutePlanningExample from "@/components/examples/route-planning-example"
import HeatmapDensityDescription from "@/components/examples/heatmap-density-description"
import HeatmapDensityExample from "@/components/examples/heatmap-density-example"

export type SitePage = {
  path: string
  title: string
  shortTitle: string
  summary: string
  sourceHref?: string
}

export type NavGroup = {
  title: string
  items: SitePage[]
}

export type DocsPage = SitePage & {
  kind: "docs"
  description: ReactNode
  preview?: ReactNode
  previewClassName?: string
}

export type ExamplePage = SitePage & {
  kind: "example"
  description: ReactNode
  preview: ReactNode
  tags?: string[]
}

const examplesOverviewPage: SitePage = {
  path: "/examples",
  title: "Examples Overview",
  shortTitle: "Overview",
  summary: "Browse production-style workflows built around area selection.",
}

const githubBase =
  "https://github.com/nirajmohanrana/react-leaflet-select-area/tree/main/examples/src"

export const docsPages: DocsPage[] = [
  {
    kind: "docs",
    path: "/docs",
    title: "Getting Started",
    shortTitle: "Getting Started",
    summary:
      "Install the package, mount it inside a React Leaflet map, and use the built-in mobile-friendly control.",
    sourceHref: `${githubBase}/components/examples/getting-started-example.tsx`,
    description: <GettingStartedDoc />,
    preview: <GettingStartedExample />,
  },
  {
    kind: "docs",
    path: "/docs/installation",
    title: "Installation",
    shortTitle: "Installation",
    summary:
      "Set up the package in a React Leaflet app, align peer dependencies, and understand the docs workspace flow.",
    sourceHref: `${githubBase}/content/docs/installation.mdx`,
    description: <InstallationDoc />,
  },
  {
    kind: "docs",
    path: "/docs/api",
    title: "API Reference",
    shortTitle: "API",
    summary:
      "Review the SelectArea props, controller contract, and hook surface available in v2.0.2.",
    sourceHref: `${githubBase}/content/docs/api.mdx`,
    description: <ApiDoc />,
  },
  {
    kind: "docs",
    path: "/docs/basic",
    title: "Basic Usage",
    shortTitle: "Basic Usage",
    summary:
      "Drive selection mode from your own button by sharing a controller with the SelectArea component.",
    sourceHref: `${githubBase}/components/examples/basic-example.tsx`,
    description: <BasicDoc />,
    preview: <BasicExample />,
  },
  {
    kind: "docs",
    path: "/docs/mobile-selection",
    title: "Mobile Selection",
    shortTitle: "Mobile",
    summary:
      "Understand the one-shot touch workflow, built-in map control, and mobile interaction model.",
    sourceHref: `${githubBase}/content/docs/mobile-selection.mdx`,
    description: <MobileSelectionDoc />,
    preview: <GettingStartedExample />,
  },
  {
    kind: "docs",
    path: "/docs/external-controller",
    title: "External Controller",
    shortTitle: "Controller",
    summary:
      "Use useSelectArea to drive selection mode from your own toolbar, form, or workflow shell.",
    sourceHref: `${githubBase}/content/docs/external-controller.mdx`,
    description: <ExternalControllerDoc />,
    preview: <BasicExample />,
  },
  {
    kind: "docs",
    path: "/docs/styling",
    title: "Styling",
    shortTitle: "Styling",
    summary:
      "Customize rectangle styling, control placement, and the surrounding app UI without changing package internals.",
    sourceHref: `${githubBase}/content/docs/styling.mdx`,
    description: <StylingDoc />,
    preview: <GeoFencingExample />,
    previewClassName: "h-[34rem]",
  },
]

export const examplePages: ExamplePage[] = [
  {
    kind: "example",
    path: "/examples/batch-geocoding",
    title: "Batch Geocoding",
    shortTitle: "Geocoding",
    summary:
      "Select addresses within a geographic area and process them in batch for geocoding or data operations.",
    sourceHref: `${githubBase}/components/examples/batch-geocoding-example.tsx`,
    description: <BatchGeocodingDescription />,
    preview: <BatchGeocodingExample />,
    tags: ["geocoding", "batch-processing", "addresses"],
  },
  {
    kind: "example",
    path: "/examples/delivery-zone",
    title: "Delivery Zone Management",
    shortTitle: "Zones",
    summary:
      "Create and manage multiple color-coded delivery zones by drawing rectangular areas on the map.",
    sourceHref: `${githubBase}/components/examples/delivery-zone-example.tsx`,
    description: <DeliveryZoneDescription />,
    preview: <DeliveryZoneExample />,
    tags: ["zones", "logistics", "delivery"],
  },
  {
    kind: "example",
    path: "/examples/property-search",
    title: "Property Search",
    shortTitle: "Property",
    summary:
      "Filter real estate properties by drawing an area on the map combined with price, beds, and square footage filters.",
    sourceHref: `${githubBase}/components/examples/property-search-example.tsx`,
    description: <PropertySearchDescription />,
    preview: <PropertySearchExample />,
    tags: ["real-estate", "filters", "search"],
  },
  {
    kind: "example",
    path: "/examples/route-planning",
    title: "Route Planning",
    shortTitle: "Route",
    summary:
      "Filter route stops by drawing an area on the map. The route recalculates based on the selected stops.",
    sourceHref: `${githubBase}/components/examples/route-planning-example.tsx`,
    description: <RoutePlanningDescription />,
    preview: <RoutePlanningExample />,
    tags: ["routing", "stops", "navigation"],
  },
  {
    kind: "example",
    path: "/examples/heatmap-density",
    title: "Heatmap Density Analysis",
    shortTitle: "Heatmap",
    summary:
      "Analyze data density within a selected area with circle markers and real-time statistics.",
    sourceHref: `${githubBase}/components/examples/heatmap-density-example.tsx`,
    description: <HeatmapDensityDescription />,
    preview: <HeatmapDensityExample />,
    tags: ["analytics", "density", "visualization"],
  },
  {
    kind: "example",
    path: "/examples/marker-group-move",
    title: "Marker Group Move",
    shortTitle: "Markers",
    summary:
      "Select a cluster of markers inside a rectangle, then drag one selected marker to move the whole group together.",
    sourceHref: `${githubBase}/components/examples/marker-group-move-example.tsx`,
    description: <MarkerGroupMoveDescription />,
    preview: <MarkerGroupMoveExample />,
    tags: ["markers", "bulk-edit", "controller"],
  },
  {
    kind: "example",
    path: "/examples/map-section-download",
    title: "Map Section Download",
    shortTitle: "Download",
    summary:
      "Draw an area on the map and export only that cropped section as a PNG for reports, tickets, or planning docs.",
    sourceHref: `${githubBase}/components/examples/map-section-download-example.tsx`,
    description: <MapSectionDownloadDescription />,
    preview: <MapSectionDownloadExample />,
    tags: ["export", "png", "reporting"],
  },
  {
    kind: "example",
    path: "/examples/geo-fencing",
    title: "Geo-fencing Workflow",
    shortTitle: "Geo-fence",
    summary:
      "Arm a temporary fence with the built-in control, keep the last boundary visible, and review fence dimensions in a side panel.",
    sourceHref: `${githubBase}/components/examples/geo-fencing-example.tsx`,
    description: <GeoFencingDescription />,
    preview: <GeoFencingExample />,
    tags: ["mobile", "operations", "boundary"],
  },
]

export const allPages: SitePage[] = [...docsPages, ...examplePages]
export const docsNavigation: NavGroup = {
  title: "Docs",
  items: docsPages,
}

export const examplesNavigation: NavGroup = {
  title: "Examples",
  items: [examplesOverviewPage, ...examplePages],
}

export const siteNavigation: NavGroup[] = [docsNavigation, examplesNavigation]

export function getDocsPage(pathname: string) {
  return docsPages.find((page) => page.path === pathname)
}

export function getExamplePage(pathname: string) {
  return examplePages.find((page) => page.path === pathname)
}

export function getPageNeighbors(pathname: string) {
  const pages =
    pathname.startsWith("/docs")
      ? docsPages
      : pathname.startsWith("/examples")
        ? examplesNavigation.items
        : []

  const index = pages.findIndex((page) => page.path === pathname)

  if (index === -1) {
    return { previousPage: null, nextPage: null }
  }

  return {
    previousPage: index > 0 ? pages[index - 1] : null,
    nextPage: index < pages.length - 1 ? pages[index + 1] : null,
  }
}
