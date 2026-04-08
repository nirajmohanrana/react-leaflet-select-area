import { useMemo, useState } from "react"
import { Check, Copy } from "lucide-react"

import CodeBlockRenderer from "@/components/code-block-renderer"
import { Button } from "@/components/ui/button"

type CodeBlockProps = {
  language: string
  children: string
  highlightedLines?: string
}
export default function CodeBlock({
  language,
  children,
  highlightedLines = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const linesToHighlight = useMemo(
    () =>
      highlightedLines.length > 0 ? highlightedLines.split(",").map(Number) : [],
    [highlightedLines]
  )

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative rounded-3xl border border-border/70 bg-slate-950">
      <Button
        variant="secondary"
        size="icon-sm"
        className="absolute top-3 right-3 z-10"
        onClick={handleCopy}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>

      <div className="overflow-x-auto rounded-3xl">
        <CodeBlockRenderer language={language} linesToHighlight={linesToHighlight}>
          {children}
        </CodeBlockRenderer>
      </div>
    </div>
  )
}
