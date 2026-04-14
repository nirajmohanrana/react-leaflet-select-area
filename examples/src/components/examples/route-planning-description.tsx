export default function RoutePlanningDescription() {
  return (
    <div className="space-y-4">
      <p>
        This example demonstrates a route planning workflow where users can
        filter which stops are included in a route by drawing a selection area
        on the map. The route recalculates based on the filtered stops.
      </p>

      <h3>How it works</h3>
      <ol className="list-decimal pl-4 space-y-2">
        <li>
          The map displays a pre-defined route with numbered stops connected
          by a polyline
        </li>
        <li>
          Click "Filter stops" and draw a rectangle to select only the stops
          within that area
        </li>
        <li>
          The route automatically updates to include only the selected stops,
          and distance/time calculations refresh
        </li>
        <li>Click "Reset" to restore all stops to the route</li>
      </ol>

      <h3>Use cases</h3>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong>Delivery logistics:</strong> Plan daily routes by neighborhood
          or delivery windows
        </li>
        <li>
          <strong>Tourism:</strong> Filter points of interest within a specific
          district for walking tours
        </li>
        <li>
          <strong>Field services:</strong> Select which job sites to visit based
          on geographic area
        </li>
      </ul>

      <h3>Key patterns</h3>
      <ul className="list-disc pl-4 space-y-2">
        <li>Dynamic polyline updates based on filtered waypoints</li>
        <li>Real-time distance and time calculations using Leaflet</li>
        <li>Opacity changes to indicate excluded stops</li>
        <li>Sidebar showing ordered route sequence</li>
      </ul>
    </div>
  )
}