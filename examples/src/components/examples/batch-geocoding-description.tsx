export default function BatchGeocodingDescription() {
  return (
    <div className="space-y-4">
      <p>
        This example demonstrates a batch geocoding workflow where users select
        multiple addresses within a geographic area on the map, then process them
        in a single operation.
      </p>

      <h3>How it works</h3>
      <ol className="list-decimal pl-4 space-y-2">
        <li>
          Activate selection mode by clicking the "Select area" button or using
          the toolbar toggle
        </li>
        <li>
          Draw a rectangle on the map to define the geographic boundary
        </li>
        <li>
          All addresses falling within the selected bounds are automatically
          highlighted in the sidebar
        </li>
        <li>
          Click "Geocode" to simulate batch processing of selected addresses
        </li>
      </ol>

      <h3>Use cases</h3>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong>Delivery planning:</strong> Select all customer addresses
          within a neighborhood for route optimization
        </li>
        <li>
          <strong>Data migration:</strong> Batch convert addresses to
          coordinates for database imports
        </li>
        <li>
          <strong>Event management:</strong> Select all venues in a city
          district for attendee logistics
        </li>
      </ul>

      <h3>Key patterns</h3>
      <ul className="list-disc pl-4 space-y-2">
        <li>Combining area selection with list filtering</li>
        <li>External controller for custom toolbar integration</li>
        <li>Synchronizing map selection with sidebar state</li>
      </ul>
    </div>
  )
}