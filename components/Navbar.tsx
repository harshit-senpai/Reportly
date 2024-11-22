import { Settings } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { ReportContent } from "./ReportContent";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const Navbar = () => {
  return (
    <div className="flex w-full items-center border-b border-border sticky top-0 backdrop-blur-md">
      <div className="h-14 flex items-center w-full px-4 lg:px-8 py-1 justify-between">
        <span className="text-primary hover:text-primary/80 transition-colors cursor-pointer font-semibold">
          Reportly.
        </span>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <div className="md:hidden flex">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[85vh]">
                <VisuallyHidden>
                  <DialogTitle>Report Content</DialogTitle>
                </VisuallyHidden>
                <ReportContent />
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};