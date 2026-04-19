# react-leaflet-select-area

A React component for selecting custom areas on a Leaflet map. It supports desktop shortcut selection and an explicit selection mode for touch and mobile users.

- npm: [react-leaflet-select-area](https://www.npmjs.com/package/react-leaflet-select-area)
- docs: [react-leaflet-select-area.vercel.app](https://react-leaflet-select-area.vercel.app/)
- source: [github.com/nirajmohanrana/react-leaflet-select-area](https://github.com/nirajmohanrana/react-leaflet-select-area)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install `react-leaflet-select-area` via npm:

```bash
npm install react-leaflet-select-area leaflet react react-dom react-leaflet
```

Or with yarn:

```bash
yarn add react-leaflet-select-area
```

## Usage

Below is a basic example of how to use `react-leaflet-select-area` in a React project with Leaflet.

### Built-in Control

```tsx
import { MapContainer, TileLayer } from 'react-leaflet';
import { SelectArea } from 'react-leaflet-select-area';
import 'leaflet/dist/leaflet.css';

const MyMap = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SelectArea
        keepRectangle
        showControl
        onBoundsChange={(bounds) => {
          console.log('Selected area:', bounds);
        }}
      />
    </MapContainer>
  );
};

export default MyMap;
```

Desktop users can still hold `Ctrl` and drag on the map. Touch and mobile users can tap the built-in control, drag once to select, and the map will return to normal pan mode automatically.

### External Button

```tsx
import { MapContainer, TileLayer } from 'react-leaflet';
import { SelectArea, useSelectArea } from 'react-leaflet-select-area';
import 'leaflet/dist/leaflet.css';

const MyMap = () => {
  const selectArea = useSelectArea();

  return (
    <>
      <button type="button" onClick={selectArea.toggleSelectionMode}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" />
          <path d="M5 3a2 2 0 0 0-2 2" />
          <path d="M19 3a2 2 0 0 1 2 2" />
          <path d="M5 21a2 2 0 0 1-2-2" />
          <path d="M9 3h1" />
          <path d="M9 21h2" />
          <path d="M14 3h1" />
          <path d="M3 9v1" />
          <path d="M21 9v2" />
          <path d="M3 14v1" />
        </svg>
        Select area
      </button>

      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SelectArea controller={selectArea} keepRectangle />
      </MapContainer>
    </>
  );
};
```

### Props

- `onBoundsChange`: A callback function that gets triggered when the selected area changes.
- `options`: Leaflet path styling for the selection rectangle.
- `keepRectangle`: Keeps the completed rectangle visible after selection.
- `showControl`: Renders a Leaflet-style select-area control inside the map.
- `controlPosition`: Sets the built-in control position.
- `controller`: Allows an external button or app state to drive selection mode.

## API

### `SelectArea`

The `SelectArea` component allows users to select a rectangular area on the map.

#### Props

| Prop | Type | Description |
|----------|----------|-----------------------------------------------------|
| `onBoundsChange` | `(bounds: SelectAreaBounds \| null) => void` | Called when the persisted selection changes, including when it is cleared. |
| `options` | `PathOptions` | Leaflet path styling for the selection rectangle. |
| `keepRectangle` | `boolean` | Keeps the completed rectangle visible. |
| `showControl` | `boolean` | Shows the built-in Leaflet-style select button. |
| `controlPosition` | `ControlPosition` | Placement for the built-in control. |
| `controller` | `SelectAreaController` | Shared controller for custom external controls. |

### `useSelectArea`

The hook returns shared selection state and actions for custom controls.

```ts
const selectArea = useSelectArea();

selectArea.enterSelectionMode();
selectArea.exitSelectionMode();
selectArea.toggleSelectionMode();
selectArea.clearSelection();
```

## Docs App

This repository also contains a pnpm workspace-powered docs and examples app in
`examples/`.

Useful commands from the repo root:

```bash
pnpm install
pnpm build
pnpm dev:examples
pnpm --filter examples build
```

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or would like to contribute to the project, feel free to open an issue or submit a pull request.

Please make sure to follow the [code of conduct](CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
