export default function MapSectionDownloadDescription() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Map Section Download</h1>
        <p>
          This pattern turns a selected area into an exportable artifact for a
          report, ticket, or planning document.
        </p>
      </div>
      <div>
        <h2>What It Shows</h2>
        <ul>
          <li>selection mode driven from app UI instead of a map-only control</li>
          <li>bounds retained on-screen so users can verify what will be exported</li>
          <li>a browser-side PNG crop generated from the visible map tiles</li>
        </ul>
      </div>
      <div>
        <h2>Implementation Note</h2>
        <p>
          The export logic lives only in the docs example. The core package
          still focuses on selection behavior and stays free of image-export
          concerns.
        </p>
      </div>
    </div>
  )
}
