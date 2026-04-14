export default function DeliveryZoneDescription() {
  return (
    <div className="space-y-4">
      <p>
        This example shows how to create and manage multiple delivery zones on a
        map. Users can draw rectangular areas, assign names, and organize them
        into color-coded zones.
      </p>

      <h3>How it works</h3>
      <ol className="list-decimal pl-4 space-y-2">
        <li>
          Click "Draw zone" to enter selection mode and draw a rectangle on the
          map
        </li>
        <li>
          Enter a name for the zone in the input field (e.g., "Downtown", "Suburbs")
        </li>
        <li>
          Click "Add zone" to save it - the zone becomes a semi-transparent
          polygon
        </li>
        <li>Repeat to create multiple overlapping or adjacent zones</li>
      </ol>

      <h3>Use cases</h3>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong>Logistics planning:</strong> Define delivery territories for
          different drivers or vehicles
        </li>
        <li>
          <strong>Service areas:</strong> Set up coverage zones for technicians
          or sales representatives
        </li>
        <li>
          <strong>Restaurant delivery:</strong> Manage multiple branches and
          their delivery ranges
        </li>
      </ul>

      <h3>Key patterns</h3>
      <ul className="list-disc pl-4 space-y-2">
        <li>Persisting area selections as polygon overlays</li>
        <li>Using color coding to distinguish zones</li>
        <li>Integrating area selection with form inputs</li>
        <li>Calculating zone dimensions (area, width, height)</li>
      </ul>
    </div>
  )
}