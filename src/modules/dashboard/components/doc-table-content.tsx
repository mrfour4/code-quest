import { Button } from "@/components/ui/button";
import { useFilters } from "@/hooks/use-filters";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useListDocuments } from "../api/documents";
import { ITEM_PER_PAGE } from "../constants";
import { DocumentRow, DocumentRowSkeleton } from "./document-row";
import { NewDocButton } from "./new-doc-btn";

export const DocumentTableSkeleton = () => {
    return (
        <div className="flex flex-col items-center justify-center rounded-md border bg-[#121215]">
            <DocumentRowSkeleton />
            <DocumentRowSkeleton />
            <DocumentRowSkeleton />
        </div>
    );
};

export const DocumentTableContent = () => {
    const { results, isLoading, loadMore, status } = useListDocuments();
    const { filters } = useFilters();

    if (status === "LoadingFirstPage") {
        return <DocumentTableSkeleton />;
    }

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center overflow-hidden rounded-md border bg-[#121215]",
                results.length === 0 && "min-h-80",
            )}
        >
            {results.length === 0 ? (
                <div className="space-y-1.5 text-center">
                    <p className="text-muted-foreground text-sm">
                        {filters.search
                            ? "No results found"
                            : "No documents yet"}
                    </p>
                    {!filters.search && <NewDocButton />}
                </div>
            ) : (
                results.map((doc) => <DocumentRow key={doc._id} doc={doc} />)
            )}

            <Button
                className={cn("my-4", status === "Exhausted" && "hidden")}
                onClick={() => loadMore(ITEM_PER_PAGE)}
                disabled={isLoading}
            >
                {isLoading && <Loader2 className="animate-spin" />}
                Load more
            </Button>
        </div>
    );
};
