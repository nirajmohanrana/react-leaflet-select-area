import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

type NpmLinkButtonProps = {
  href: string
  compact?: boolean
}

export default function NpmLinkButton({
  href,
  compact = false,
}: NpmLinkButtonProps) {
  return (
    <Button variant="outline" size={compact ? "icon" : "sm"} asChild>
      <a href={href} target="_blank" rel="noreferrer">
        <Icons.npm className="size-4" />
        {!compact && "npm"}
        <span className="sr-only">View on npm</span>
      </a>
    </Button>
  )
}