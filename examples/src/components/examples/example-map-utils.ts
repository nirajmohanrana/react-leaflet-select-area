import { divIcon, latLng, latLngBounds, point, type LatLngBounds } from "leaflet"
import type { Map as LeafletMap } from "leaflet"

import type { SelectAreaBounds } from "react-leaflet-select-area"

export type MarkerItem = {
  id: number
  label?: string
  position: [number, number]
}

export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

export const CARTO_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> OpenStreetMap contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

export function formatBounds(bounds: SelectAreaBounds | null) {
  if (!bounds) {
    return "No area selected"
  }

  const [[latA, lngA], [latB, lngB]] = bounds
  return `${latA.toFixed(4)}, ${lngA.toFixed(4)} -> ${latB.toFixed(4)}, ${lngB.toFixed(4)}`
}

export function normalizeBounds(bounds: SelectAreaBounds): LatLngBounds {
  return latLngBounds(bounds)
}

export function markerIsWithinBounds(
  marker: MarkerItem,
  bounds: SelectAreaBounds | null,
) {
  if (!bounds) {
    return false
  }

  return normalizeBounds(bounds).contains(latLng(marker.position[0], marker.position[1]))
}

export function createMarkerIcon(selected: boolean) {
  const bg = selected ? "#0f766e" : "#0f172a"
  const ring = selected ? "#99f6e4" : "#e2e8f0"

  return divIcon({
    className: "",
    html: `<div style="display:flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:9999px;background:${bg};border:3px solid ${ring};box-shadow:0 10px 24px rgba(15,23,42,0.18)"></div>`,
    iconSize: point(18, 18),
    iconAnchor: point(9, 9),
  })
}

export function generateMarkers(
  center: [number, number],
  count: number,
  spread = 0.08,
) {
  return Array.from({ length: count }, (_, index) => {
    const latOffset = (Math.random() - 0.5) * spread
    const lngOffset = (Math.random() - 0.5) * spread

    return {
      id: index + 1,
      label: `M${index + 1}`,
      position: [center[0] + latOffset, center[1] + lngOffset] as [number, number],
    }
  })
}

export function getBoundsMetrics(bounds: SelectAreaBounds | null) {
  if (!bounds) {
    return null
  }

  const normalized = normalizeBounds(bounds)
  const northWest = normalized.getNorthWest()
  const northEast = normalized.getNorthEast()
  const southWest = normalized.getSouthWest()
  const widthKm = northWest.distanceTo(northEast) / 1000
  const heightKm = northWest.distanceTo(southWest) / 1000

  return {
    widthKm,
    heightKm,
    areaKm2: widthKm * heightKm,
  }
}

export async function downloadMapSelectionAsPng(
  map: LeafletMap,
  bounds: SelectAreaBounds,
  filename: string,
) {
  const container = map.getContainer()
  const mapRect = container.getBoundingClientRect()
  const normalized = normalizeBounds(bounds)
  const northWest = map.latLngToContainerPoint(normalized.getNorthWest())
  const southEast = map.latLngToContainerPoint(normalized.getSouthEast())
  const cropLeft = Math.max(0, Math.floor(Math.min(northWest.x, southEast.x)))
  const cropTop = Math.max(0, Math.floor(Math.min(northWest.y, southEast.y)))
  const cropRight = Math.min(
    container.clientWidth,
    Math.ceil(Math.max(northWest.x, southEast.x)),
  )
  const cropBottom = Math.min(
    container.clientHeight,
    Math.ceil(Math.max(northWest.y, southEast.y)),
  )
  const width = cropRight - cropLeft
  const height = cropBottom - cropTop

  if (width <= 0 || height <= 0) {
    throw new Error("Selected area is too small to export.")
  }

  const devicePixelRatio = window.devicePixelRatio || 1
  const canvas = document.createElement("canvas")
  canvas.width = width * devicePixelRatio
  canvas.height = height * devicePixelRatio

  const context = canvas.getContext("2d")

  if (!context) {
    throw new Error("Canvas rendering is not available in this browser.")
  }

  context.scale(devicePixelRatio, devicePixelRatio)

  const tiles = Array.from(
    container.querySelectorAll<HTMLImageElement>(".leaflet-tile-pane img.leaflet-tile"),
  )

  if (!tiles.length) {
    throw new Error("Map tiles are still loading. Try again in a moment.")
  }

  for (const tile of tiles) {
    if (!tile.complete || !tile.naturalWidth) {
      continue
    }

    const rect = tile.getBoundingClientRect()
    const drawX = rect.left - mapRect.left - cropLeft
    const drawY = rect.top - mapRect.top - cropTop

    context.drawImage(tile, drawX, drawY, rect.width, rect.height)
  }

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/png")
  })

  if (!blob) {
    throw new Error("Browser could not generate the PNG export.")
  }

  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
