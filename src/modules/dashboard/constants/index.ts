import { BookCheck, Files, LucideIcon, PencilLine } from "lucide-react";

export type NavbarItem = {
    name: string;
    href: string;
    icon: LucideIcon;
};

export const NAVBAR_ITEMS: NavbarItem[] = [
    { name: "All", href: "/", icon: Files },
    { name: "Draft", href: "/draft", icon: PencilLine },
    { name: "Published", href: "/published", icon: BookCheck },
];
