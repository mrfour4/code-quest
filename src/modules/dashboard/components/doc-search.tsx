import { Input } from "@/components/ui/input";
import { useFilters } from "@/hooks/use-filters";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const DocumentSearch = () => {
    const { filters, setFilters } = useFilters();
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(filters.search);
    }, [filters.search]);

    const onSearchChange = useDebouncedCallback((value: string) => {
        setFilters({ ...filters, search: value });
    }, 500);

    return (
        <div className="relative w-full lg:w-80">
            <Input
                placeholder="Search title..."
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    onSearchChange(e.target.value);
                }}
                className="bg-primary-foreground pr-8"
                onFocus={(e) => e.target.select()}
            />
            <Search className="text-muted-foreground absolute top-1/2 right-2 size-4 -translate-y-1/2" />
        </div>
    );
};
