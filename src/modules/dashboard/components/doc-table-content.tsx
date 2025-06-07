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
        <div className="bg-background flex flex-col items-center justify-center rounded-md border">
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
                "bg-background divide-y rounded-md border px-4",
                results.length === 0 && "min-h-80",
            )}
        >
            {results.length == 0 && (
                <div className="flex min-h-80 flex-col items-center justify-center space-y-1.5 text-center">
                    <p className="text-muted-foreground text-sm">
                        {filters.search
                            ? "No results found"
                            : "No documents yet"}
                    </p>
                    {!filters.search && <NewDocButton />}
                </div>
            )}
            <div className="flex flex-col divide-y">
                {results.length > 0 &&
                    results.map((doc) => (
                        <DocumentRow key={doc._id} doc={doc} />
                    ))}
            </div>
            <div className="flex w-full items-center justify-center">
                <Button
                    className={cn(
                        "mx-auto my-4",
                        status === "Exhausted" && "hidden",
                    )}
                    onClick={() => loadMore(ITEM_PER_PAGE)}
                    disabled={isLoading}
                >
                    {isLoading && <Loader2 className="animate-spin" />}
                    Load more
                </Button>
            </div>
        </div>
    );
};
