"use client";

import { useFilters } from "@/hooks/use-filters";
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

                <div className="flex items-center gap-x-2 lg:gap-x-4">
                    <DocumentSearch />
                    <DocumentTypes />
                    <NewDocButton />
                </div>
            </div>

            <DocumentTableContent />
        </>
    );
};
