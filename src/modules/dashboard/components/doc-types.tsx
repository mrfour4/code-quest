import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFilters } from "@/hooks/use-filters";
import { DOCUMENT_TYPES } from "../constants";
import { DocumentType } from "../types";

export const DocumentTypes = () => {
    const { filters, setFilters } = useFilters();

    const value = filters.type || "all";
    const onChange = (value: string) => {
        setFilters({
            ...filters,
            type: value === "all" ? null : (value as DocumentType),
        });
    };

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="capitalize lg:hidden">
                <SelectValue placeholder={value} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {DOCUMENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                        {type}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
