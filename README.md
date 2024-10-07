# react-leaflet-select-area

A React component for selecting custom areas on a Leaflet map. This component is built using React and Leaflet to enable easy area selection functionality for maps.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install `react-leaflet-select-area` via npm:

```bash
npm install react-leaflet-select-area
```

Or with yarn:

```bash
yarn add react-leaflet-select-area
```

## Usage

Below is a basic example of how to use `react-leaflet-select-area` in a React project with Leaflet.

### Example

```tsx
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { SelectArea } from 'react-leaflet-select-area';

const MyMap = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SelectArea
        onSelect={(bounds) => {
          console.log('Selected Area:', bounds);
        }}
      />
    </MapContainer>
  );
};

export default MyMap;
```

### Props

- `onBoundsChange`: A callback function that gets triggered when the selected area changes.

## API

### `SelectArea`

The `SelectArea` component allows users to select a rectangular area on the map.

#### Props

| Prop     | Type     | Description                                         |
|----------|----------|-----------------------------------------------------|
| `onBoundsChange` | Function | Callback function that gets triggered when the selected area changes.

#### Example

```tsx
<SelectArea
  onSelect={(bounds) => {
    console.log('Selected area bounds:', bounds);
  }}
/>
```

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or would like to contribute to the project, feel free to open an issue or submit a pull request.

Please make sure to follow the [code of conduct](CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.