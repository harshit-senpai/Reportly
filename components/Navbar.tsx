import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border dark:border-border/40 px-4 bg-background dark:bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="h-14 flex items-center">
        <nav className="flex items-center gap-4">
          <Link href={"/"}>
            <span className="font-semibold mr-3">Reportly</span>
          </Link>
          <Link
            href={"/upload"}
            className="transition-colors font-medium text-foreground/60 hover:text-foreground/80"
          >
            Upload
          </Link>
          <Link
            href={"/chat"}
            className="transition-colors font-medium text-foreground/60 hover:text-foreground/80"
          >
            Chat
          </Link>
        </nav>
        <div className="flex ml-auto items-center">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
