import { Settings, Share } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import Code from "./code";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <img
          src="https://react-leaflet.js.org/img/logo-title-alt.svg"
          alt="logo"
          className="h-12 w-auto"
        />
        <Separator orientation="vertical" className="h-8" />
        <h1 className="text-xl font-semibold">Select Area</h1>
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Settings className="size-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </DrawerTrigger>
        <DrawerDescription className="sr-only">
          Configure the settings for the model and messages.
        </DrawerDescription>
        <DrawerContent className="max-h-[80vh]">
          <DrawerTitle>Configuration</DrawerTitle>
          <Code />
        </DrawerContent>
      </Drawer>
      <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
        <Share className="size-3.5" />
        Share
      </Button>
    </header>
  );
};

export default Header;
