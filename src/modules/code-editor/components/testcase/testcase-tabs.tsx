import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useAtomValue, useSetAtom } from "jotai";
import { Plus } from "lucide-react";
import { cloneTestCaseAtom, testCaseIdsAtom } from "../../atom/testcase";
import { activeTestCaseIdAtom } from "../../atom/testcase/active";
import { TestCaseTab } from "./testcase-tab";

export const InputTestcaseTabs = () => {
    const testCaseIds = useAtomValue(testCaseIdsAtom);
    const cloneTestCase = useSetAtom(cloneTestCaseAtom);
    const activeId = useAtomValue(activeTestCaseIdAtom);

    return (
        <div className="shrink-0 px-4 py-2">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-4">
                {testCaseIds.map((id, index) => (
                    <TestCaseTab
                        key={index}
                        id={id}
                        index={index}
                        active={id === activeId}
                        canRemove={testCaseIds.length > 1}
                    />
                ))}

                <Hint message="Clone current testcase">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={cloneTestCase}
                        className="-ml-1 size-7 cursor-pointer"
                    >
                        <Plus />
                    </Button>
                </Hint>
            </div>
        </div>
    );
};
