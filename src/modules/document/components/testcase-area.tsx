import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Results } from "@/modules/code-editor/components/results";
import { Testcase } from "@/modules/code-editor/components/testcase";
import { FlaskConical, Terminal } from "lucide-react";
import { useState } from "react";

export const TestCaseArea = () => {
    const [activeTab, setActiveTab] = useState("testcase");

    return (
        <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="bg-border flex h-full flex-col rounded-md border"
        >
            <div className="bg-accent flex h-10 items-center justify-between border-b px-2">
                <TabsList>
                    <TabsTrigger value="testcase">
                        <FlaskConical className="text-amber-500" />
                        Testcase
                    </TabsTrigger>
                    <Separator orientation="vertical" className="mx-1 !h-4/5" />
                    <TabsTrigger value="result">
                        <Terminal className="text-green-500" />
                        Test Result
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="testcase" className="flex-1 overflow-auto p-4">
                <Testcase />
            </TabsContent>

            <TabsContent value="result" className="flex-1 overflow-hidden">
                <Results />
            </TabsContent>
        </Tabs>
    );
};
