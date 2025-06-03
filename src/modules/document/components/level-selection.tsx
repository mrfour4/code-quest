import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { DOCUMENT_TAGS } from "../constants";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export const LevelSelection = ({ value, onChange }: Props) => {
    const color = DOCUMENT_TAGS.find((tag) => tag.label === value)?.color || "";

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={cn("w-full capitalize", color)}>
                <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
                {DOCUMENT_TAGS.map((tag) => (
                    <SelectItem
                        key={tag.label}
                        value={tag.label}
                        className={cn("capitalize", tag.color)}
                    >
                        {tag.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
