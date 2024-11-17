import { Settings } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <div className="flex w-full items-center border-b border-border sticky top-0 backdrop-blur-md">
      <div className="h-14 flex items-center w-full px-4 lg:px-8 py-1 justify-between">
        <span className="text-primary hover:text-primary/80 transition-colors cursor-pointer font-semibold">
          Reportly.
        </span>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button className="" variant={"outline"} size={"icon"}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
