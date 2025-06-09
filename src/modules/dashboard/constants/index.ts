import { FileCheck, LucideIcon, PencilLine } from "lucide-react";
import { DocumentType } from "../types";

export const DOCUMENT_TYPES = [DocumentType.DRAFT, DocumentType.PUBLISHED];

export type DocumentIconMap = {
    [key: string]: LucideIcon;
};

export const DOCUMENT_ICON_MAP: DocumentIconMap = {
    draft: PencilLine,
    published: FileCheck,
};

export const ITEM_PER_PAGE = 5;

type NavigationItem = {
    label: string;
    href: string;
};

export const NAVIGATION_ITEMS: NavigationItem[] = [
    {
        label: "Problems",
        href: "/problems",
    },
    {
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        label: "Features",
        href: "/#features",
    },
];
