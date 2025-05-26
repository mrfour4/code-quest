import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Plus, Trash, X } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useImmer } from "use-immer";
import { TestCase } from "../types";
import { LabelInput } from "./label-input";

const initialTestCases: TestCase[] = [
    {
        id: "1",
        inputs: [
            { label: "nums", value: "[2,7,11,15]" },
            { label: "target", value: "9" },
        ],
        expected: "[0,1]",
    },
    {
        id: "2",
        inputs: [
            { label: "nums", value: "[3,2,4]" },
            { label: "target", value: "6" },
        ],
        expected: "[1,2]",
    },
    {
        id: "21",
        inputs: [
            { label: "nums", value: "[3,2,4]" },
            { label: "target", value: "6" },
        ],
        expected: "[1,2]",
    },
    {
        id: "3",
        inputs: [
            { label: "nums", value: "[3,3]" },
            { label: "target", value: "6" },
        ],
        expected: "[0,1]",
    },
];

export const Testcase = () => {
    const [testCases, setTestCases] = useImmer<TestCase[]>(initialTestCases);
    const [activeTestCase, setActiveTestCase] = useState(testCases[0].id);

    const currentTestCase = testCases.find((tc) => tc.id === activeTestCase);

    const onAddInput = (testCaseId: string) => {
        setTestCases((draft) => {
            const testCase = draft.find((tc) => tc.id === testCaseId);
            if (testCase) {
                testCase.inputs.push({
                    label: `param ${testCase.inputs.length}`,
                    value: "",
                });
            }
        });
    };

    const onRemoveInput = (testCaseId: string, index: number) => {
        if (!currentTestCase || currentTestCase.inputs.length <= 1) return;

        setTestCases((draft) => {
            const testCase = draft.find((tc) => tc.id === testCaseId);
            if (testCase && testCase.inputs.length > 1) {
                testCase.inputs.splice(index, 1);
            }
        });
    };

    const onUpdateInput = (
        testCaseId: string,
        index: number,
        field: "label" | "value",
        value: string,
    ) => {
        setTestCases((draft) => {
            const testCase = draft.find((tc) => tc.id === testCaseId);
            if (testCase) {
                testCase.inputs[index][field] = value;
            }
        });
    };

    const onUpdateExpected = (testCaseId: string, value: string) => {
        setTestCases((draft) => {
            const testCase = draft.find((tc) => tc.id === testCaseId);
            if (testCase) {
                testCase.expected = value;
            }
        });
    };

    const onCloneTestCase = () => {
        const newTestCase: TestCase = {
            id: nanoid(),
            inputs: currentTestCase?.inputs.slice() || [],
            expected: currentTestCase?.expected || "",
        };

        setTestCases((draft) => {
            draft.push(newTestCase);
        });
        setActiveTestCase(newTestCase.id);
    };

    const onRemoveTestCase = (testCaseId: string) => {
        if (testCases.length <= 1) return;

        setTestCases((draft) => draft.filter((tc) => tc.id !== testCaseId));
        if (activeTestCase === testCaseId) {
            setActiveTestCase(testCases[0].id);
        }
    };

    return (
        <div className="flex h-full flex-col">
            <div className="shrink-0 px-4 py-2 shadow">
                <div
                    className="flex flex-wrap items-center gap-x-2 gap-y-4"
                    key={activeTestCase}
                >
                    {testCases.map((testCase, index) => (
                        <div key={testCase.id} className="group relative">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setActiveTestCase(testCase.id)}
                                className={cn(
                                    "hover:!bg-ring group-hover:bg-ring h-auto cursor-pointer rounded-sm px-4 py-1",
                                    activeTestCase === testCase.id &&
                                        "bg-ring group-hover:bg-ring/80",
                                )}
                            >
                                Case {index + 1}
                            </Button>
                            {testCases.length > 1 && (
                                <button
                                    className="bg-muted-foreground absolute top-0 right-0 hidden translate-x-1/2 -translate-y-1/3 cursor-pointer rounded-full p-0.5 group-hover:block"
                                    onClick={() =>
                                        onRemoveTestCase(testCase.id)
                                    }
                                >
                                    <X className="size-2.5" />
                                </button>
                            )}
                        </div>
                    ))}

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onCloneTestCase}
                                className="-ml-1 size-7 cursor-pointer"
                            >
                                <Plus />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Clone current testcase</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-4 pt-0">
                        {currentTestCase && (
                            <div className="space-y-3">
                                {currentTestCase.inputs.map((input, index) => (
                                    <div
                                        key={index}
                                        className="group space-y-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <LabelInput
                                                value={input.label}
                                                onChange={(value) =>
                                                    onUpdateInput(
                                                        currentTestCase.id,
                                                        index,
                                                        "label",
                                                        value,
                                                    )
                                                }
                                            />
                                            {currentTestCase.inputs.length >
                                                1 && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        onRemoveInput(
                                                            currentTestCase.id,
                                                            index,
                                                        )
                                                    }
                                                    className="hover:text-destructive invisible size-7 group-hover:visible"
                                                >
                                                    <Trash className="size-3.5" />
                                                </Button>
                                            )}
                                        </div>
                                        <Textarea
                                            value={input.value}
                                            onChange={(e) =>
                                                onUpdateInput(
                                                    currentTestCase.id,
                                                    index,
                                                    "value",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Value"
                                            className="bg-border min-h-10"
                                            rows={1}
                                        />
                                    </div>
                                ))}

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        onAddInput(currentTestCase.id)
                                    }
                                    className="hover:!bg-input cursor-pointer gap-1 rounded-sm text-xs"
                                >
                                    <Plus className="size-3" />
                                    Add Parameter
                                </Button>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground text-xs font-medium">
                                            Expected =
                                        </span>
                                    </div>
                                    <Textarea
                                        value={currentTestCase.expected}
                                        onChange={(e) =>
                                            onUpdateExpected(
                                                currentTestCase.id,
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Expected output"
                                        className="bg-border min-h-10"
                                        rows={1}
                                        onFocus={(e) => e.target.select()}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};
