export default function PropertySearchDescription() {
  return (
    <div className="space-y-4">
      <p>
        This example demonstrates a real estate property search application where
        users can filter properties by area and multiple criteria like price,
        bedrooms, bathrooms, and square footage.
      </p>

      <h3>How it works</h3>
      <ol className="list-decimal pl-4 space-y-2">
        <li>
          Click "Search area" and draw a rectangle on the map to filter
          properties within that geographic area
        </li>
        <li>
          Use the filter panel on the left to narrow down results by price range,
          number of beds/baths, and square footage
        </li>
        <li>
          Click on any property card or marker to see details and highlight it on
          the map
        </li>
        <li>
          Properties outside the selected area are excluded from results
          automatically
        </li>
      </ol>

      <h3>Use cases</h3>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong>Real estate apps:</strong> Help buyers find homes within their
          preferred neighborhood
        </li>
        <li>
          <strong>Property management:</strong> Filter listings by geographic
          zones for different agents
        </li>
        <li>
          <strong>Investment analysis:</strong> Compare property values across
          different areas
        </li>
      </ul>

      <h3>Key patterns</h3>
      <ul className="list-disc pl-4 space-y-2">
        <li>Combining area selection with text/numeric filters</li>
        <li>Synchronizing list and map views</li>
        <li>Popup details on marker click</li>
        <li>Multi-criteria filtering with React state</li>
      </ul>
    </div>
  )
}