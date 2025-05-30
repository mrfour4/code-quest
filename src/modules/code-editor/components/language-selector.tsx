import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from "../constants";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export const LanguageSelector = ({ value, onChange }: Props) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="!h-8 rounded-sm border-none text-white dark:bg-transparent">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
