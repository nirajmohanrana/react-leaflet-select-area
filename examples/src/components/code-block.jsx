import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

const CodeBlock = ({ language, children, highlightedLines = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const linesToHighlight =
    typeof highlightedLines === "string"
      ? highlightedLines.split(",").map(Number)
      : highlightedLines;

  return (
    <div className="relative">
      <Button
        onClick={handleCopy}
        variant="secondary"
        size="icon"
        className="absolute top-2 right-2 text-xs h-6 w-6 p-1"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>

      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers
        lineProps={(lineNumber) => {
          let style = { display: "block" };

          // Check if the line should be highlighted
          if (linesToHighlight.includes(lineNumber)) {
            style = {
              backgroundColor: "#fffa9e", // Yellow background
              borderLeft: "4px solid #f39c12", // Orange border for emphasis
              color: "#000", // Dark text for better contrast
            };
          }

          return { style };
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
