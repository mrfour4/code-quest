"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetProblems } from "@/modules/dashboard/api/documents";
import { useListCategories } from "@/modules/document/api/categories";
import { getCategoryOpts, getTagOpts } from "../lib/utils";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const ProblemTable = () => {
    const problems = useGetProblems();
    const categories = useListCategories();

    const isLoading = problems.isPending || categories.isPending;

    if (isLoading) {
        return <ProblemTableSkeleton />;
    }

    const categoryOpts = getCategoryOpts(categories.data ?? []);
    const tagOpts = getTagOpts();

    return (
        <div className="mx-auto mt-10 max-w-3xl px-4 py-10">
            <DataTable
                columns={columns}
                data={problems.data ?? []}
                categoryOpts={categoryOpts}
                tagOpts={tagOpts}
            />
        </div>
    );
};

export const ProblemTableSkeleton = () => {
    return (
        <div className="mx-auto mt-10 max-w-3xl space-y-4 px-1 py-10">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
    );
};
