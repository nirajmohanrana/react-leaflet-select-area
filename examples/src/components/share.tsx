import { Button } from "./ui/button";
import { Share as ShareIcon } from "lucide-react";

const Share = () => {
  const handleShare = async () => {
    const currentUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: currentUrl,
        });
        console.log("Share successful");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(currentUrl);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy: ", error);
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-auto gap-1.5 text-sm"
      onClick={handleShare}
    >
      <ShareIcon className="size-3.5" />
      Share
    </Button>
  );
};

export default Share;
