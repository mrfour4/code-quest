import { Button } from "@/components/ui/button";
import { useGetCurrentDocument } from "@/modules/dashboard/api/documents";
import { useAtomValue, useSetAtom } from "jotai";
import { Plus } from "lucide-react";
import { testCasesFamilyAtom } from "../../atom/testcase";
import { activeTestCaseIdAtom } from "../../atom/testcase/active";
import {
    addInputToTestCase,
    removeInputFromTestCase,
    updateExpectedInTestCase,
    updateInputInTestCase,
} from "../../atom/testcase/input";
import { InputSection } from "./input-section";

export const InputsTestCase = () => {
    const activeTestCaseId = useAtomValue(activeTestCaseIdAtom);
    const currentTestCase = useAtomValue(testCasesFamilyAtom(activeTestCaseId));

    const add = useSetAtom(addInputToTestCase);
    const remove = useSetAtom(removeInputFromTestCase);
    const update = useSetAtom(updateInputInTestCase);
    const updateExpected = useSetAtom(updateExpectedInTestCase);

    const { data: document } = useGetCurrentDocument();

    if (!currentTestCase || !document) {
        return null;
    }

    return (
        <div className="space-y-3" key={activeTestCaseId}>
            {currentTestCase.inputs.map((input) => (
                <InputSection
                    key={input.id}
                    input={input}
                    canRemove={
                        currentTestCase.inputs.length > 1 &&
                        document.type !== "published"
                    }
                    onUpdate={(value, field) => update(input.id, field, value)}
                    onRemove={() => remove(input.id)}
                />
            ))}

            <Button
                variant="ghost"
                size="sm"
                onClick={add}
                className="hover:!bg-input cursor-pointer gap-1 rounded-sm text-xs"
            >
                <Plus className="size-3" />
                Add Parameter
            </Button>

            <InputSection
                input={{
                    label: "expected",
                    value: currentTestCase.expected,
                }}
                canRemove={false}
                editableLabel={false}
                onUpdate={(value) => updateExpected(value)}
            />
        </div>
    );
};
