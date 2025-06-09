"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Option } from "../types";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    categoryOpts: Option[];
    tagOpts: Option[];
}

export function DataTableToolbar<TData>({
    table,
    categoryOpts,
    tagOpts,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center gap-2">
                    <Input
                        placeholder="Filter title..."
                        value={
                            (table
                                .getColumn("title")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("title")
                                ?.setFilterValue(event.target.value)
                        }
                        className="hidden h-8 w-full md:inline-flex"
                    />
                    {table.getColumn("category") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("category")}
                            title="Category"
                            options={categoryOpts}
                        />
                    )}
                    {table.getColumn("tag") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("tag")}
                            title="Tag"
                            options={tagOpts}
                        />
                    )}
                    {isFiltered && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => table.resetColumnFilters()}
                        >
                            Reset
                            <X />
                        </Button>
                    )}
                </div>
            </div>
            <Input
                placeholder="Filter title..."
                value={
                    (table.getColumn("title")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                    table.getColumn("title")?.setFilterValue(event.target.value)
                }
                className="h-8 w-full md:hidden"
            />
        </div>
    );
}
