import { Updater } from "use-immer";
import { TestResult } from "../types";
type Props = {
    value: TestResult[];
    onChange: Updater<TestResult[]>;
};

export const Results = ({ value, onChange }: Props) => {
    if (value.length === 0) {
        return (
            <div className="flex size-full items-center justify-center">
                <p className="text-muted-foreground text-sm">
                    You must run your code first
                </p>
            </div>
        );
    }

    return <div>Result</div>;
};
