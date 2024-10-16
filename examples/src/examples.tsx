import GettingStarted from "./components/examples/1-getting-started/getting-started.mdx";
import GettingStartedExample from "./components/examples/1-getting-started/getting-started-eg";
import Basic from "./components/examples/2-basic/basic.mdx";
import BasicExample from "./components/examples/2-basic/basic-eg";

export const examples = [
  {
    index: 0,
    name: "Getting Started",
    path: "/",
    description: <GettingStarted />,
    example: <GettingStartedExample />,
    githubLink:
      "https://github.com/nirajmohanrana/react-leaflet-select-area/tree/main/examples/src/components/examples/1-getting-started/getting-started-eg.tsx",
  },
  {
    index: 0,
    name: "Basic Example",
    path: "/basic",
    description: <Basic />,
    example: <BasicExample />,
    githubLink:
      "https://github.com/nirajmohanrana/react-leaflet-select-area/tree/main/examples/src/components/examples/1-getting-started/basic-eg.tsx",
  },
];
