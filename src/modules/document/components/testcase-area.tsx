import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Results } from "@/modules/code-editor/components/results";
import { Testcase } from "@/modules/code-editor/components/testcase";
import { FlaskConical, Terminal } from "lucide-react";
import { useState } from "react";
import { TestCaseTab } from "./types";

export const TestCaseArea = () => {
    const [activeTab, setActiveTab] = useState<TestCaseTab>(
        TestCaseTab.TestCase,
    );

    return (
        <div className="flex h-full flex-col overflow-hidden">
            <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as TestCaseTab)}
                className="bg-border flex h-full flex-col rounded-md border"
            >
                <div className="bg-accent flex h-10 items-center justify-between rounded-t-md border-b px-2">
                    <TabsList>
                        <TabsTrigger value={TestCaseTab.TestCase}>
                            <FlaskConical className="text-amber-500" />
                            Testcase
                        </TabsTrigger>
                        <Separator
                            orientation="vertical"
                            className="mx-1 !h-4/5"
                        />
                        <TabsTrigger value={TestCaseTab.Result}>
                            <Terminal className="text-green-500" />
                            Test Result
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent
                    value={TestCaseTab.TestCase}
                    className="flex-1 overflow-hidden"
                >
                    <Testcase />
                </TabsContent>

                <TabsContent
                    value={TestCaseTab.Result}
                    className="flex-1 overflow-hidden"
                >
                    <Results />
                </TabsContent>
            </Tabs>
        </div>
    );
};
