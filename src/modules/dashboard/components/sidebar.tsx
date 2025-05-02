"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth, useClerk, useOrganizationList } from "@clerk/nextjs";
import { FileText, Folders, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVBAR_ITEMS } from "../constants";

export const Sidebar = () => {
    const { openOrganizationProfile, openCreateOrganization } = useClerk();
    const { userMemberships, isLoaded, setActive } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });

    const { orgId } = useAuth();
    const pathname = usePathname();

    if (!isLoaded) {
        return null;
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
                    {NAVBAR_ITEMS.map((item) => (
                        <Link
                            href={item.href}
                            key={item.href}
                            className={cn(
                                "hover:bg-accent hover:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-3 py-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                                pathname === item.href &&
                                    "bg-accent text-accent-foreground",
                            )}
                        >
                            <FileText />
                            {item.name}
                        </Link>
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
                                afterCreateOrganizationUrl: "/draft",
                            });
                        }}
                    >
                        <Plus className="text-muted-foreground" />
                    </Button>
                </div>

                <div className="space-y-1">
                    {orgs.map((item) => (
                        <div
                            key={item.id}
                            className={cn(
                                "group hover:bg-accent hover:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-3 py-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                                orgId === item.id &&
                                    "bg-accent text-accent-foreground",
                            )}
                            onClick={() => setActive({ organization: item.id })}
                        >
                            <div className="mr-auto flex items-center gap-2">
                                <Folders />
                                {item.name}
                            </div>
                            <button
                                className="hidden group-hover:block hover:cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openOrganizationProfile({
                                        afterLeaveOrganizationUrl: "/",
                                    });
                                }}
                            >
                                <Settings />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};
