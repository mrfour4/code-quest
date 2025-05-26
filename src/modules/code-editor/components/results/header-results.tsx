import { cn } from "@/lib/utils";
import {
    getOverallStatus,
    getStatusColor,
    getStatusText,
} from "../../lib/utils";
import { TestResult } from "../../types";

type Props = {
    results: TestResult[];
};

export const HeaderResult = ({ results }: Props) => {
    const overallStatus = getOverallStatus(results);
    const colorStatus = getStatusColor(overallStatus || "");
    const status = getStatusText(overallStatus || "");

    return (
        <div className="flex-shrink-0 px-3 pt-2">
            <div className="flex items-center gap-4">
                <span className={cn("text-xl font-medium", colorStatus)}>
                    {status}
                </span>
                <span className="text-muted-foreground text-sm">
                    Runtime: {Math.max(...results.map((r) => r.runtime))} ms
                </span>
            </div>
        </div>
    );
};
