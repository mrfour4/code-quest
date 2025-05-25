import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { TestCase } from "../types";

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
        id: "3",
        inputs: [
            { label: "nums", value: "[3,3]" },
            { label: "target", value: "6" },
        ],
        expected: "[0,1]",
    },
];

export const Testcase = () => {
    const [testCases, setTestCases] = useState<TestCase[]>(initialTestCases);
    const [activeTestCase, setActiveTestCase] = useState("1");

    const currentTestCase = testCases.find((tc) => tc.id === activeTestCase);
    return (
        <>
            <div className="mb-4 flex items-center gap-2">
                {testCases.map((testCase) => (
                    <div key={testCase.id} className="flex items-center">
                        <Button
                            variant={
                                activeTestCase === testCase.id
                                    ? "default"
                                    : "ghost"
                            }
                            size="sm"
                            onClick={() => setActiveTestCase(testCase.id)}
                            className={`rounded-r-none ${
                                activeTestCase === testCase.id
                                    ? "bg-gray-600 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            }`}
                        >
                            Case {testCase.id}
                        </Button>
                        {testCases.length > 1 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {}}
                                className="rounded-l-none px-2 text-gray-400 hover:bg-gray-700 hover:text-red-400"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        )}
                    </div>
                ))}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {}}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            {currentTestCase && (
                <div className="space-y-4">
                    {currentTestCase.inputs.map((input, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={input.label}
                                        onChange={(e) => {}}
                                        className="min-w-0 flex-shrink-0 rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm font-medium text-white"
                                        placeholder="Label"
                                    />
                                    <span className="text-gray-300">=</span>
                                </div>
                                {currentTestCase.inputs.length > 1 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {}}
                                        className="text-gray-400 hover:text-red-400"
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                )}
                            </div>
                            <Textarea
                                value={input.value}
                                onChange={(e) => {}}
                                className="border-gray-600 bg-gray-700 font-mono text-white"
                                rows={2}
                                placeholder="Value"
                            />
                        </div>
                    ))}

                    {/* Expected Output */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-300">
                                Expected =
                            </span>
                        </div>
                        <Textarea
                            value={currentTestCase.expected}
                            onChange={(e) => {}}
                            className="border-gray-600 bg-gray-700 font-mono text-white"
                            rows={2}
                            placeholder="Expected output"
                        />
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {}}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        <Plus className="mr-1 h-4 w-4" />
                        Add Input
                    </Button>
                </div>
            )}
        </>
    );
};
