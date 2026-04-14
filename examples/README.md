# Examples App

This app powers the interactive docs and live examples for
`react-leaflet-select-area`.

- npm: [react-leaflet-select-area](https://www.npmjs.com/package/react-leaflet-select-area)
- docs: [react-leaflet-select-area.vercel.app](https://react-leaflet-select-area.vercel.app/)
- source: [github.com/nirajmohanrana/react-leaflet-select-area](https://github.com/nirajmohanrana/react-leaflet-select-area)

## Stack

- Vite
- React 19
- TanStack Router file-based routing
- MDX content pages
- shadcn/ui
- React Leaflet demos

## Local Development

Run from the repo root:

```bash
pnpm dev:examples
```

The examples app resolves the local package source from the repo so the docs
stay aligned with unreleased library changes.

## Build Commands

Run from the repo root:

```bash
pnpm build
pnpm --filter examples build
pnpm --filter examples lint
```

## Vercel Deployment

- Import the repository at the repo root.
- Use `pnpm install` as the install command.
- Use `pnpm --filter examples build` as the build command.
- Use `examples/dist` as the output directory.

The examples app depends on the local workspace package, so Vercel must build
from the repository root rather than treating `examples` as an isolated
project.
