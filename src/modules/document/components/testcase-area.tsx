import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Results } from "@/modules/code-editor/components/results";
import { Testcase } from "@/modules/code-editor/components/testcase";
import { TestCase, TestResult } from "@/modules/code-editor/types";
import { FlaskConical, Terminal } from "lucide-react";
import { useState } from "react";
import { useImmer } from "use-immer";

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

export const TestCaseArea = () => {
    const [activeTab, setActiveTab] = useState("testcase");

    const [testCases, setTestCases] = useImmer<TestCase[]>(initialTestCases);
    const [results, setResults] = useImmer<TestResult[]>([]);

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

            <TabsContent
                value="testcase"
                className="flex-1 overflow-auto px-3 py-2"
            >
                <Testcase value={testCases} onChange={setTestCases} />
            </TabsContent>

            <TabsContent value="result" className="flex-1">
                <Results value={results} onChange={setResults} />
            </TabsContent>
        </Tabs>
    );
};
