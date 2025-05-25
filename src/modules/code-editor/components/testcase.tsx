import { Button } from "@/components/ui/button";
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
import { Updater } from "use-immer";
import { TestCase } from "../types";
import { LabelInput } from "./label-input";

type Props = {
    value: TestCase[];
    onChange: Updater<TestCase[]>;
};

export const Testcase = ({ value, onChange }: Props) => {
    const [activeTestCase, setActiveTestCase] = useState("1");

    const currentTestCase = value.find((tc) => tc.id === activeTestCase);

    const onAddInput = (testCaseId: string) => {
        onChange((draft) => {
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

        onChange((draft) => {
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
        onChange((draft) => {
            const testCase = draft.find((tc) => tc.id === testCaseId);
            if (testCase) {
                testCase.inputs[index][field] = value;
            }
        });
    };

    const onUpdateExpected = (testCaseId: string, value: string) => {
        onChange((draft) => {
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

        onChange((draft) => {
            draft.push(newTestCase);
        });
        setActiveTestCase(newTestCase.id);
    };

    const onRemoveTestCase = (testCaseId: string) => {
        if (value.length <= 1) return;

        onChange((draft) => draft.filter((tc) => tc.id !== testCaseId));
        if (activeTestCase === testCaseId) {
            setActiveTestCase(value[0].id);
        }
    };

    return (
        <>
            <div
                className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-4"
                key={activeTestCase}
            >
                {value.map((testCase, index) => (
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
                        {value.length > 1 && (
                            <button
                                className="bg-muted-foreground absolute top-0 right-0 hidden translate-x-1/2 -translate-y-1/3 cursor-pointer rounded-full p-0.5 group-hover:block"
                                onClick={() => onRemoveTestCase(testCase.id)}
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

            {currentTestCase && (
                <div className="space-y-3">
                    {currentTestCase.inputs.map((input, index) => (
                        <div key={index} className="group space-y-2">
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
                                {currentTestCase.inputs.length > 1 && (
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
                        onClick={() => onAddInput(currentTestCase.id)}
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
        </>
    );
};
