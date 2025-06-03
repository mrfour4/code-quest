"use client";

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
        return <div className="container mx-auto py-10">Loading...</div>;
    }

    const categoryOpts = getCategoryOpts(categories.data ?? []);
    const tagOpts = getTagOpts();

    return (
        <div className="mx-auto px-1 py-10">
            <DataTable
                columns={columns}
                data={problems.data ?? []}
                categoryOpts={categoryOpts}
                tagOpts={tagOpts}
            />
        </div>
    );
};
