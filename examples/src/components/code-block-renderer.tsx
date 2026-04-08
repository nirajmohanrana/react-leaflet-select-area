import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

type CodeBlockRendererProps = {
  language: string
  children: string
  linesToHighlight: number[]
}

export default function CodeBlockRenderer({
  language,
  children,
  linesToHighlight,
}: CodeBlockRendererProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        background: "transparent",
        margin: 0,
        minWidth: "max-content",
        padding: "1.25rem",
        fontSize: "0.85rem",
      }}
      showLineNumbers
      lineProps={(lineNumber: number) => {
        if (!linesToHighlight.includes(lineNumber)) {
          return { style: { display: "block" } }
        }

        return {
          style: {
            display: "block",
            backgroundColor: "rgba(253, 224, 71, 0.18)",
            borderLeft: "3px solid #f59e0b",
          },
        }
      }}
    >
      {children}
    </SyntaxHighlighter>
  )
}
