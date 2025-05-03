"use client";

import { Button } from "@/components/ui/button";
import { useFilters } from "@/hooks/use-filters";
import { useAuth, useClerk } from "@clerk/nextjs";
import { FileText, Layers, Plus } from "lucide-react";
import { DOCUMENT_TYPES } from "../constants";
import { DocumentType } from "../types";
import { SidebarItem } from "./sidebar-item";
import { SidebarOrganization } from "./sidebar-org";

export const Sidebar = () => {
    const { redirectToCreateOrganization } = useClerk();

    const { filters, setFilters } = useFilters();

    const { orgId } = useAuth();

    const onTypeChange = (type: DocumentType | null) => {
        setFilters({ ...filters, type });
    };

    return (
        <aside className="fixed inset-y-0 left-0 hidden w-64 lg:flex">
            <div className="size-full flex-col border-r p-2 pt-18 dark:bg-[#121215]">
                <p className="px-2 py-1.5 text-base font-semibold data-[inset]:pl-8">
                    Documents
                </p>

                <div className="space-y-1">
                    <SidebarItem
                        title="All Documents"
                        icon={Layers}
                        isActive={filters.type === null}
                        onClick={() => onTypeChange(null)}
                    />
                    {DOCUMENT_TYPES.map((type) => (
                        <SidebarItem
                            key={type}
                            title={type}
                            icon={FileText}
                            isActive={filters.type === type}
                            onClick={() => onTypeChange(type)}
                        />
                    ))}
                </div>

                <div className="mb-1 flex w-full justify-between">
                    <p className="px-2 py-1.5 text-base font-semibold data-[inset]:pl-8">
                        Organizations
                    </p>

                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                            redirectToCreateOrganization();
                        }}
                    >
                        <Plus className="text-muted-foreground" />
                    </Button>
                </div>

                <SidebarOrganization orgId={orgId} />
            </div>
        </aside>
    );
};
