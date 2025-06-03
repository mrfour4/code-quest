import { ScrollArea } from "@/components/ui/scroll-area";
import { InputsTestCase } from "./inputs";
import { SaveTestCasesButton } from "./save-btn";
import { InputTestcaseTabs } from "./testcase-tabs";

export const Testcase = () => {
    return (
        <div className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-2 px-4 py-2">
                <InputTestcaseTabs />
                <SaveTestCasesButton />
            </div>

            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-4 pt-0">
                        <InputsTestCase />
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};
