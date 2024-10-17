import React from "react";
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import { examples } from "./examples";
import { ExampleLayout } from "./layout/example-layout";
import "leaflet/dist/leaflet.css";

const components = {
  em: (props: React.HTMLAttributes<HTMLElement>) => <i {...props} />,
};

const App = () => {
  return (
    <Router>
      <MDXProvider components={components}>
        <Routes>
          {examples.map((example) => (
            <Route
              key={example.path}
              path={example.path}
              element={<ExampleLayout />}
            />
          ))}
        </Routes>
      </MDXProvider>
      <Analytics/>
    </Router>
  );
};

export default App;
