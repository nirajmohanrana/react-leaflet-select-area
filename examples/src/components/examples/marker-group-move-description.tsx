export default function MarkerGroupMoveDescription() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Marker Group Move</h1>
        <p>
          This workflow is useful when operators need to adjust a cluster of
          assets together after quickly selecting them on the map.
        </p>
      </div>
      <div>
        <h2>What It Shows</h2>
        <ul>
          <li>at least ten live markers with individual dragging always available</li>
          <li>rectangle selection used as a bulk action trigger instead of a final output</li>
          <li>group movement driven by dragging any selected marker after selection</li>
        </ul>
      </div>
      <div>
        <h2>Why It Matters</h2>
        <p>
          Many map workflows need an edit mode after area selection. This
          example shows how to combine <code>SelectArea</code> with your own
          marker state and interaction rules without changing the package API.
        </p>
      </div>
    </div>
  )
}
