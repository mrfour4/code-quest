import { DocumentType } from "@/modules/dashboard/types";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

export const useFilters = () => {
    const [filters, setFilters] = useQueryStates({
        type: parseAsStringEnum<DocumentType>(Object.values(DocumentType)),
        search: parseAsString.withDefault(""),
    });

    return { filters, setFilters };
};
