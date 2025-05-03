"use client";

import { Button } from "@/components/ui/button";
import { useFilters } from "@/hooks/use-filters";
import { cn } from "@/lib/utils";
import { useAuth, useClerk, useOrganizationList } from "@clerk/nextjs";
import {
    Building2,
    FileText,
    Folders,
    Layers,
    Plus,
    Settings,
} from "lucide-react";
import { DOCUMENT_TYPES } from "../constants";
import { DocumentType } from "../types";
import { SidebarItem } from "./sidebar-item";

export const Sidebar = () => {
    const { openOrganizationProfile, openCreateOrganization } = useClerk();
    const { userMemberships, isLoaded, setActive } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });

    const { filters, setFilters } = useFilters();

    const { orgId } = useAuth();

    const onTypeChange = (type: DocumentType | null) => {
        setFilters({ ...filters, type });
    };

    if (!isLoaded) {
        return <div>loading...</div>;
    }

    const orgs = userMemberships.data.map((mem) => ({
        id: mem.organization.id,
        name: mem.organization.name,
        href: mem.organization.slug,
    }));

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
                <div className="flex w-full justify-between">
                    <p className="px-2 py-1.5 text-base font-semibold data-[inset]:pl-8">
                        Organizations
                    </p>

                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                            openCreateOrganization({
                                afterCreateOrganizationUrl: "/",
                            });
                        }}
                    >
                        <Plus className="text-muted-foreground" />
                    </Button>
                </div>

                <div className="space-y-1">
                    <SidebarItem
                        title="All Organizations"
                        icon={Building2}
                        isActive={!orgId}
                        onClick={() => setActive({ organization: null })}
                    />
                    {orgs.map((item) => (
                        <SidebarItem
                            key={item.id}
                            title={item.name}
                            icon={Folders}
                            isActive={orgId === item.id}
                            onClick={() => setActive({ organization: item.id })}
                        >
                            <button
                                className={cn(
                                    "hidden hover:cursor-pointer",
                                    orgId && "group-hover:block",
                                )}
                                onClick={(e) => {
                                    e.stopPropagation();

                                    openOrganizationProfile({
                                        afterLeaveOrganizationUrl: "/",
                                    });
                                }}
                            >
                                <Settings />
                            </button>
                        </SidebarItem>
                    ))}
                </div>
            </div>
        </aside>
    );
};
