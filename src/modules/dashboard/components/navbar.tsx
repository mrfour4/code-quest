import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { NAVIGATION_ITEMS } from "../constants";
import { Logo } from "./logo";

export const Navbar = () => {
    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="ghost" className="md:hidden">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            <Logo />
                        </SheetTitle>
                        <SheetDescription>
                            Welcome to Code Quest! Explore our features and
                            start your coding journey.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="px-4">
                        <NavbarContent />
                    </div>
                </SheetContent>
            </Sheet>

            <div className="hidden md:block">
                <NavbarContent />
            </div>
        </>
    );
};

export const NavbarContent = () => {
    return (
        <nav className="flex flex-col items-start space-x-6 text-sm font-medium md:flex-row">
            {NAVIGATION_ITEMS.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-foreground/80 py-2 transition-colors hover:underline"
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};
