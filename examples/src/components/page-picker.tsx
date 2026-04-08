import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useNavigate, useRouterState } from "@tanstack/react-router"

import type { SitePage } from "@/content/pages"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type PagePickerProps = {
  pages: SitePage[]
  placeholder?: string
}

export default function PagePicker({
  pages,
  placeholder = "Search pages...",
}: PagePickerProps) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const currentPage = pages.find((page) => page.path === pathname) ?? pages[0]

  if (!currentPage) {
    return null
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between sm:w-[240px]"
        >
          {currentPage.title}
          <ChevronsUpDown className="size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No page found.</CommandEmpty>
            <CommandGroup>
              {pages.map((page) => (
                <CommandItem
                  key={page.path}
                  value={`${page.title} ${page.summary}`}
                  onSelect={() => {
                    setOpen(false)
                    void navigate({ to: page.path })
                  }}
                >
                  <div className="min-w-0">
                    <div className="truncate">{page.title}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {page.summary}
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto size-4",
                      pathname === page.path ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
