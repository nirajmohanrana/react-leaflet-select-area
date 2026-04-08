import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

type SourceLinkButtonProps = {
  href: string
  compact?: boolean
}

export default function SourceLinkButton({
  href,
  compact = false,
}: SourceLinkButtonProps) {
  return (
    <Button variant="outline" size={compact ? "icon" : "sm"} asChild>
      <a href={href} target="_blank" rel="noreferrer">
        <Icons.gitHub className="size-4" />
        {!compact && "Source"}
        <span className="sr-only">View source</span>
      </a>
    </Button>
  )
}
