import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TestResult } from "../../types";

type Props = {
    results: TestResult[];
    active: string;
    onChange: (value: string) => void;
};

export const ResultsTestcaseTabs = ({ results, active, onChange }: Props) => {
    return (
        <div className="flex-shrink-0 px-3">
            <div className="flex items-center gap-2 shadow-xs">
                {results.map((result) => (
                    <Button
                        key={result.testCaseId}
                        variant="ghost"
                        size="sm"
                        onClick={() => onChange(result.testCaseId)}
                        className={cn(
                            "hover:!bg-ring h-auto cursor-pointer rounded-sm px-4 py-1",
                            active === result.testCaseId && "bg-ring/60",
                        )}
                    >
                        <div
                            className={cn(
                                "size-1 rounded-full",
                                result.status === "accepted"
                                    ? "bg-green-400"
                                    : "bg-red-400",
                            )}
                        />
                        Case {result.testCaseId}
                    </Button>
                ))}
            </div>
        </div>
    );
};
