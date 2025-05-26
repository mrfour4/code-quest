import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { TestCase } from "../../types";

type Props = {
    active: string;
    onChange: (value: string) => void;
    testCases: TestCase[];
    onRemove: (testCaseId: string) => void;
    onClone: () => void;
};

export const InputTestcaseTabs = ({
    active,
    onChange,
    testCases,
    onRemove,
    onClone,
}: Props) => {
    return (
        <div className="shrink-0 px-4 py-2">
            <div
                className="flex flex-wrap items-center gap-x-2 gap-y-4"
                key={active}
            >
                {testCases.map((testCase, index) => (
                    <div key={testCase.id} className="group relative">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onChange(testCase.id)}
                            className={cn(
                                "hover:!bg-ring group-hover:bg-ring h-auto cursor-pointer rounded-sm px-4 py-1",
                                active === testCase.id &&
                                    "bg-ring group-hover:bg-ring/80",
                            )}
                        >
                            Case {index + 1}
                        </Button>
                        {testCases.length > 1 && (
                            <button
                                className="bg-muted-foreground absolute top-0 right-0 hidden translate-x-1/2 -translate-y-1/3 cursor-pointer rounded-full p-0.5 group-hover:block"
                                onClick={() => onRemove(testCase.id)}
                            >
                                <X className="size-2.5" />
                            </button>
                        )}
                    </div>
                ))}

                <Hint message="Clone current testcase">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClone}
                        className="-ml-1 size-7 cursor-pointer"
                    >
                        <Plus />
                    </Button>
                </Hint>
            </div>
        </div>
    );
};
