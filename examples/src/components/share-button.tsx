import { Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ShareButton() {
  const handleShare = async () => {
    const currentUrl = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: currentUrl,
        })
        return
      } catch {
        // Fall back to clipboard copy below.
      }
    }

    await navigator.clipboard.writeText(currentUrl)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1.5"
      onClick={handleShare}
    >
      <Share2 className="size-3.5" />
      Share
    </Button>
  )
}
