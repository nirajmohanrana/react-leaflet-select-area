import Header from "@/components/header";
import { examples } from "@/examples";
import { useLocation } from "react-router-dom";

export function ExampleLayout() {
  const location = useLocation();

  const currentExample = examples.find(
    (example) => example.path === location.pathname
  );

  if (!currentExample) {
    return <div>Example not found!</div>;
  }

  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <Header />
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden flex-col items-start gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            {currentExample.description}
          </div>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            {currentExample.example}
          </div>
        </main>
      </div>
    </div>
  );
}
