export default function GeoFencingDescription() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Geo-fencing Workflow</h1>
        <p>
          This example mirrors an operations screen where the map owns the
          selection action and the surrounding panel reviews the confirmed fence.
        </p>
      </div>
      <div>
        <h2>What It Shows</h2>
        <ul>
          <li>the built-in control as the primary trigger for touch-friendly use</li>
          <li>the last confirmed rectangle staying visible with <code>keepRectangle</code></li>
          <li>derived fence metrics shown outside the map without custom selection logic</li>
        </ul>
      </div>
      <div>
        <h2>Why It Matters</h2>
        <p>
          A lot of production apps do not need a generic selection demo. They
          need a boundary workflow. This example keeps the package story tied to
          a real operational outcome.
        </p>
      </div>
    </div>
  )
}
