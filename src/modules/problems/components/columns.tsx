"use client";

import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { FunctionReturnType } from "convex/server";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import { DataTableColumnHeader } from "./data-table-column-header";

export type Problem = FunctionReturnType<typeof api.documents.problems>[number];

export const columns: ColumnDef<Problem>[] = [
    {
        accessorKey: "category",
        header: () => null,
        cell: () => null,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            const title = row.getValue("title") as string;
            const id = row.original._id as string;

            return (
                <Link href={`problems/${id}`} className="hover:underline">
                    {title}
                </Link>
            );
        },
    },
    {
        accessorKey: "tag",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tag" />
        ),
        cell: ({ row }) => {
            const tag = row.getValue("tag") as string;
            const color = getColor(tag);

            return <p className={cn(color, "capitalize")}>{tag}</p>;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
];

export const getColor = (tag: string) => {
    switch (tag) {
        case "easy":
            return "text-green-500";
        case "medium":
            return "text-yellow-500";
        case "hard":
            return "text-red-500";
        default:
            return "";
    }
};
