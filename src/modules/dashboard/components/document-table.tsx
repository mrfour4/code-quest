"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFilters } from "@/hooks/use-filters";
import { List } from "lucide-react";
import Link from "next/link";
import { DocumentSearch } from "./doc-search";
import { DocumentTableContent } from "./doc-table-content";
import { DocumentTypes } from "./doc-types";
import { NewDocButton } from "./new-doc-btn";

export const DocumentTable = () => {
    const { filters } = useFilters();

    return (
        <div className="flex h-[80vh] w-full flex-col overflow-hidden">
            <div className="flex h-full flex-col gap-y-3 overflow-hidden lg:gap-y-6">
                <div className="flex w-full items-center justify-between py-1">
                    <h1 className="line-clamp-1 truncate text-xl font-semibold capitalize">
                        {filters.type ? filters.type : "all"}
                    </h1>

                    <div className="flex items-center gap-x-2">
                        <DocumentTypes />
                        <NewDocButton />
                        <Hint message="View all problems">
                            <Button
                                asChild
                                variant="secondary"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground dark:text-primary dark:bg-input/50 dark:hover:bg-input/70"
                            >
                                <Link href="/problems">
                                    <List />
                                </Link>
                            </Button>
                        </Hint>
                    </div>
                </div>

                <DocumentSearch />

                <ScrollArea className="flex h-full flex-col overflow-auto rounded-md">
                    <DocumentTableContent />
                </ScrollArea>
            </div>
        </div>
    );
};
