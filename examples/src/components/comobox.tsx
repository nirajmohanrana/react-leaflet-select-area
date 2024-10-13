import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { examples } from "@/examples";

export function Combobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current example based on the current path
  const currentExample = examples.find(
    (example) => example.path === location.pathname
  );

  useEffect(() => {
    if (currentExample) {
      setValue(currentExample.name);
    } else {
      setValue("");
    }
  }, [location.pathname, currentExample]);

  const handleSelect = (currentValue: string) => {
    const selectedExample = examples.find(
      (example) => example.name === currentValue
    );
    if (selectedExample) {
      if (location.pathname === selectedExample.path) {
        setOpen(false);
        return;
      }

      setValue(currentValue);
      setOpen(false);
      navigate(selectedExample.path);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value || "Select example..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={
              currentExample
                ? `Current: ${currentExample.name}`
                : "Search example..."
            }
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No example found.</CommandEmpty>
            <CommandGroup>
              {examples.map((example) => (
                <CommandItem
                  key={example.name}
                  value={example.name}
                  onSelect={() => handleSelect(example.name)}
                >
                  {example.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === example.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
