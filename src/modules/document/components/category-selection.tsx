import { CheckIcon, ChevronsUpDownIcon, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useListCategories } from "../api/categories";
import { CreateCategoryButton } from "./create-category";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export const CategorySelection = ({ value, onChange }: Props) => {
    const [open, setOpen] = useState(false);
    const [creating, setCreating] = useState(false);

    const { isPending, data: categories } = useListCategories();

    if (isPending) {
        return (
            <Input disabled value="Loading categories..." className="w-full" />
        );
    }

    if (!categories || categories.length === 0 || creating) {
        return (
            <CreateCategoryButton
                onChange={onChange}
                onClose={() => setCreating(false)}
            />
        );
    }

    const onFilter = (value: string, search: string) => {
        const categoryName = categories
            .find((category) => category._id === value)
            ?.name.toLowerCase();

        const isMatch = categoryName?.includes(search.toLowerCase());

        return isMatch ? 1 : 0;
    };
    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between capitalize"
                >
                    {value
                        ? categories.find((category) => category._id === value)
                              ?.name
                        : "Select category"}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 sm:w-[464px]">
                <Command filter={onFilter}>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setCreating(true);
                                    setOpen(false);
                                }}
                                className="text-muted-foreground"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add new category
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category._id}
                                    className="capitalize"
                                    onSelect={(currentValue) => {
                                        onChange(
                                            currentValue === value
                                                ? ""
                                                : currentValue,
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === category._id
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    {category.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
