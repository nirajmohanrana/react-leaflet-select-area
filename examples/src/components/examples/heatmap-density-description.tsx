export default function HeatmapDensityDescription() {
  return (
    <div className="space-y-4">
      <p>
        This example demonstrates a data density visualization workflow where
        users can analyze data points within a specific geographic area. It
        features two visualization modes and real-time statistics.
      </p>

      <h3>How it works</h3>
      <ol className="list-decimal pl-4 space-y-2">
        <li>
          The map displays random data points as circle markers with varying
          sizes representing values
        </li>
        <li>
          Draw a selection area to filter which data points are included in the
          analysis
        </li>
        <li>
          Switch between "Circles" mode (size-based) and "Intensity" mode
          (color-based) for different visualizations
        </li>
        <li>
          The sidebar displays real-time statistics: count, total, average, and
          max values
        </li>
      </ol>

      <h3>Use cases</h3>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong>Analytics dashboards:</strong> Analyze user activity or sales
          data within specific regions
        </li>
        <li>
          <strong>Environmental monitoring:</strong> Filter sensor readings
          within a geographic boundary
        </li>
        <li>
          <strong>Population studies:</strong> Analyze demographic data density
          in urban areas
        </li>
      </ul>

      <h3>Key patterns</h3>
      <ul className="list-disc pl-4 space-y-2">
        <li>CircleMarker for performant rendering of many data points</li>
        <li>Dynamic styling based on data values</li>
        <li>Real-time statistics calculation from filtered data</li>
        <li>Area metrics calculation (width, height, total area)</li>
        <li>Toggle between visualization modes</li>
      </ul>
    </div>
  )
}