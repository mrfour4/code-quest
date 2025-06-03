"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
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
        <>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-xl font-semibold capitalize">
                    {filters.type ? filters.type : "all"}
                </h1>

                <div className="flex items-center gap-x-3">
                    <DocumentSearch />
                    <DocumentTypes />
                    <NewDocButton />
                    <Hint message="View all problems">
                        <Button
                            asChild
                            variant="secondary"
                            className="bg-input/50 hover:bg-input/70"
                        >
                            <Link href="/problems">
                                <List />
                            </Link>
                        </Button>
                    </Hint>
                </div>
            </div>

            <DocumentTableContent />
        </>
    );
};
