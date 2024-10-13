import { useEffect } from "react";
import { Combobox } from "@/components/comobox";
import Header from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { examples } from "@/examples";
import { useLocation } from "react-router-dom";

export function ExampleLayout() {
  const location = useLocation();

  // Find the current example based on the location
  const currentExample = examples.find(
    (example) => example.path === location.pathname
  );

  // Update the document title only if currentExample is defined
  useEffect(() => {
    if (currentExample) {
      document.title = `${currentExample.name} | Select Area`;
    }
  }, [currentExample]); // Depend on currentExample to update the title

  if (!currentExample) {
    return <div>Example not found!</div>;
  }

  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <Header />

        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="prose lg:prose-lg dark:prose-invert order-last sm:order-first">
            <div className="flex items-center justify-end">
              <Combobox />
            </div>

            <Separator className="my-2" />

            <ScrollArea className="h-full px-4 max-h-[calc(100vh-150px)] overflow-y-auto">
              {currentExample.description}
            </ScrollArea>
          </div>

          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 lg:col-span-2 overflow-clip">
            {currentExample.example}
          </div>
        </main>
      </div>
    </div>
  );
}
