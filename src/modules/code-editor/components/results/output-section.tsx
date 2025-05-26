import { firaCode } from "@/lib/font";
import { cn } from "@/lib/utils";
import { DiffValue } from "../../types";
import { HighlightContent } from "./highlight-content";

type Props = {
    label: string;
    value: string;
    diff: DiffValue;
    status: string;
};

export const OutputResultSection = ({ label, value, diff, status }: Props) => {
    return (
        <div>
            <h3 className="text-muted-foreground mb-2 text-xs font-medium capitalize">
                {label}
            </h3>
            <div
                className={cn(
                    "bg-border rounded-md p-3 text-sm break-all",
                    firaCode.className,
                )}
            >
                {status === "wrong_answer" ? (
                    <HighlightContent value={diff} origin={value} />
                ) : (
                    value
                )}
            </div>
        </div>
    );
};
