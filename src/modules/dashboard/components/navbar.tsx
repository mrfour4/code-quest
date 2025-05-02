import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText } from "lucide-react";
import { NAVBAR_ITEMS } from "../constants";
import { Organizations } from "./oranization";

export const Navbar = () => {
    return (
        <div className="flex items-center gap-x-2 lg:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="secondary">
                        <FileText />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {NAVBAR_ITEMS.map((item) => (
                        <DropdownMenuItem key={item.href}>
                            <item.icon />
                            {item.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <Organizations />
        </div>
    );
};
