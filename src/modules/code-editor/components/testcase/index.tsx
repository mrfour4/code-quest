import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useImmer } from "use-immer";
import { TestCase } from "../../types";
import { InputSection } from "./input-section";
import { InputTestcaseTabs } from "./testcase-tabs";

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
            <InputTestcaseTabs
                active={activeTestCase}
                onChange={setActiveTestCase}
                testCases={testCases}
                onRemove={onRemoveTestCase}
                onClone={onCloneTestCase}
            />

            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-4 pt-0">
                        {currentTestCase && (
                            <div className="space-y-3">
                                {currentTestCase.inputs.map((input, index) => (
                                    <InputSection
                                        key={index + input.label}
                                        input={input}
                                        canRemove={
                                            currentTestCase.inputs.length > 1
                                        }
                                        onUpdate={(field, value) =>
                                            onUpdateInput(
                                                currentTestCase.id,
                                                index,
                                                value,
                                                field,
                                            )
                                        }
                                        onRemove={() =>
                                            onRemoveInput(
                                                currentTestCase.id,
                                                index,
                                            )
                                        }
                                    />
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

                                <InputSection
                                    input={{
                                        label: "Expected",
                                        value: currentTestCase.expected,
                                    }}
                                    canRemove={false}
                                    editableLabel={false}
                                    onUpdate={(value) =>
                                        onUpdateExpected(
                                            currentTestCase.id,
                                            value,
                                        )
                                    }
                                />
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};
