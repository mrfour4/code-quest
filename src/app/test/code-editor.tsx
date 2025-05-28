"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Editor from "@monaco-editor/react";
import {
    ChevronDown,
    ChevronUp,
    Code2,
    Play,
    Plus,
    RotateCcw,
    X,
} from "lucide-react";
import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface TestCase {
    id: string;
    inputs: { label: string; value: string }[];
    expected: string;
}

interface TestResult {
    testCaseId: string;
    output: string;
    expected: string;
    status: "accepted" | "wrong_answer" | "error";
    runtime: number;
    error?: string;
}

const LANGUAGES = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
];

const DEFAULT_CODE = {
    javascript: `function twoSum(nums, target) {
  const pairIdx = {};
  
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (target - num in pairIdx) {
      return [i, pairIdx[target - num]];
    }
    pairIdx[num] = i;
  }
};`,
    typescript: `function twoSum(nums: number[], target: number): number[] {
  const pairIdx: { [key: number]: number } = {};
  
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (target - num in pairIdx) {
      return [i, pairIdx[target - num]];
    }
    pairIdx[num] = i;
  }
  return [];
}`,
    python: `def two_sum(nums, target):
    pair_idx = {}
    
    for i, num in enumerate(nums):
        if target - num in pair_idx:
            return [i, pair_idx[target - num]]
        pair_idx[num] = i
    
    return []`,
};

// Helper function to highlight differences
const highlightDiff = (output: string, expected: string) => {
    if (output === expected) return { output, expected };

    try {
        const outputParsed = JSON.parse(output);
        const expectedParsed = JSON.parse(expected);

        if (Array.isArray(outputParsed) && Array.isArray(expectedParsed)) {
            const outputHighlighted = outputParsed.map((item, index) => {
                const isWrong = expectedParsed[index] !== item;
                return { value: item, isWrong };
            });

            const expectedHighlighted = expectedParsed.map((item, index) => {
                const isCorrect = outputParsed[index] !== item;
                return { value: item, isCorrect };
            });

            return { outputHighlighted, expectedHighlighted };
        }
    } catch {
        // If not valid JSON, return as is
    }

    return { output, expected };
};

// Error Display Component
function ErrorDisplay({ error }: { error: string }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLines = 5;
    const lines = error.split("\n");
    const shouldShowToggle = lines.length > maxLines;
    const displayLines = isExpanded ? lines : lines.slice(0, maxLines);

    return (
        <div className="rounded border border-red-600 bg-red-900/20">
            <div className="p-3">
                <pre className="font-mono text-sm whitespace-pre-wrap text-red-300">
                    {displayLines.join("\n")}
                </pre>
            </div>
            {shouldShowToggle && (
                <div className="border-t border-red-600/50 px-3 py-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full justify-center text-gray-400 hover:bg-red-900/30 hover:text-white"
                    >
                        {isExpanded ? (
                            <>
                                <ChevronUp className="mr-1 h-4 w-4" />
                                View less
                            </>
                        ) : (
                            <>
                                <ChevronDown className="mr-1 h-4 w-4" />
                                View more
                            </>
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default function CodeEditor() {
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState(DEFAULT_CODE.javascript);
    const [testCases, setTestCases] = useState<TestCase[]>([
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
    ]);
    const [results, setResults] = useState<TestResult[]>([]);
    console.log("🚀 ~ results:", JSON.stringify(results, null, 2));
    const [activeTab, setActiveTab] = useState("testcase");
    const [activeTestCase, setActiveTestCase] = useState("1");
    const [activeResultCase, setActiveResultCase] = useState("1");

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
        if (DEFAULT_CODE[newLanguage as keyof typeof DEFAULT_CODE]) {
            setCode(DEFAULT_CODE[newLanguage as keyof typeof DEFAULT_CODE]);
        }
    };

    const handleFormatCode = async () => {
        console.log("Format code triggered");
    };

    const handleResetCode = () => {
        if (DEFAULT_CODE[language as keyof typeof DEFAULT_CODE]) {
            setCode(DEFAULT_CODE[language as keyof typeof DEFAULT_CODE]);
        }
    };

    const handleRunCode = () => {
        const startTime = Date.now();
        const newResults: TestResult[] = [];

        testCases.forEach((testCase) => {
            try {
                if (language === "javascript") {
                    const func = new Function("return " + code)();
                    const inputs = testCase.inputs.map((input) => {
                        try {
                            return JSON.parse(input.value);
                        } catch {
                            return input.value;
                        }
                    });
                    const result = func(...inputs);
                    const output = JSON.stringify(result);
                    const runtime = Date.now() - startTime;

                    const status =
                        output === testCase.expected
                            ? "accepted"
                            : "wrong_answer";

                    newResults.push({
                        testCaseId: testCase.id,
                        output,
                        expected: testCase.expected,
                        status,
                        runtime,
                    });
                } else {
                    newResults.push({
                        testCaseId: testCase.id,
                        output: "",
                        expected: testCase.expected,
                        status: "error",
                        runtime: 0,
                        error: "Language not supported in demo",
                    });
                }
            } catch (error) {
                // Create a more detailed error message for demonstration
                const errorMessage =
                    error instanceof Error ? error.message : "Unknown error";
                const detailedError = `Line 6 in solution.js
    if (target - num in pairIdx) {
                        ^

ReferenceError: ${errorMessage}
    Line 6: Char 29 in solution.js (twoSum)
    Line 25: Char 19 in solution.js (Object.<anonymous>)
    Line 16: Char 8 in runner.js (Object.runner)
    Line 12: Char 26 in solution.js (Object.<anonymous>)
    at Module._compile (node:internal/modules/cjs/loader:1554:14)
    at Object..js (node:internal/modules/cjs/loader:1706:10)
    at Module.load (node:internal/modules/cjs/loader:1289:32)
    at Function.Module._load (node:internal/modules/cjs/loader:1105:12)
    at Module.require (node:internal/modules/cjs/loader:1329:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.<anonymous> (/tmp/solution.js:1:1)
    at Module._compile (node:internal/modules/cjs/loader:1554:14)`;

                newResults.push({
                    testCaseId: testCase.id,
                    output: "",
                    expected: testCase.expected,
                    status: "error",
                    runtime: 0,
                    error: detailedError,
                });
            }
        });

        setResults(newResults);
        setActiveTab("result");
        setActiveResultCase("1");
    };

    const addTestCase = () => {
        const newId = (testCases.length + 1).toString();
        const newTestCase: TestCase = {
            id: newId,
            inputs: [
                { label: "nums", value: "[]" },
                { label: "target", value: "0" },
            ],
            expected: "[]",
        };
        setTestCases([...testCases, newTestCase]);
        setActiveTestCase(newId);
    };

    const removeTestCase = (id: string) => {
        if (testCases.length > 1) {
            setTestCases(testCases.filter((tc) => tc.id !== id));
            if (activeTestCase === id) {
                setActiveTestCase(testCases[0].id);
            }
        }
    };

    const updateTestCaseInput = (
        testCaseId: string,
        inputIndex: number,
        field: "label" | "value",
        value: string,
    ) => {
        setTestCases(
            testCases.map((tc) => {
                if (tc.id === testCaseId) {
                    const newInputs = [...tc.inputs];
                    newInputs[inputIndex] = {
                        ...newInputs[inputIndex],
                        [field]: value,
                    };
                    return { ...tc, inputs: newInputs };
                }
                return tc;
            }),
        );
    };

    const updateTestCaseExpected = (testCaseId: string, expected: string) => {
        setTestCases(
            testCases.map((tc) => {
                if (tc.id === testCaseId) {
                    return { ...tc, expected };
                }
                return tc;
            }),
        );
    };

    const addInputToTestCase = (testCaseId: string) => {
        setTestCases(
            testCases.map((tc) => {
                if (tc.id === testCaseId) {
                    return {
                        ...tc,
                        inputs: [...tc.inputs, { label: "param", value: "" }],
                    };
                }
                return tc;
            }),
        );
    };

    const removeInputFromTestCase = (
        testCaseId: string,
        inputIndex: number,
    ) => {
        setTestCases(
            testCases.map((tc) => {
                if (tc.id === testCaseId) {
                    return {
                        ...tc,
                        inputs: tc.inputs.filter(
                            (_, index) => index !== inputIndex,
                        ),
                    };
                }
                return tc;
            }),
        );
    };

    const currentTestCase = testCases.find((tc) => tc.id === activeTestCase);
    const currentResult = results.find(
        (r) => r.testCaseId === activeResultCase,
    );
    const currentResultTestCase = testCases.find(
        (tc) => tc.id === activeResultCase,
    );

    // Get overall status
    const overallStatus =
        results.length > 0
            ? results.every((r) => r.status === "accepted")
                ? "accepted"
                : results.some((r) => r.status === "error")
                  ? "error"
                  : "wrong_answer"
            : null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case "accepted":
                return "text-green-400";
            case "wrong_answer":
                return "text-red-400";
            case "error":
                return "text-red-400";
            default:
                return "text-gray-400";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "accepted":
                return "Accepted";
            case "wrong_answer":
                return "Wrong Answer";
            case "error":
                return "Runtime Error";
            default:
                return "Unknown";
        }
    };

    return (
        <div className="flex h-screen flex-col overflow-hidden border border-gray-700 bg-gray-900">
            <div className="flex h-12 flex-shrink-0 items-center justify-between border-b border-gray-700 bg-gray-800 px-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-blue-400" />
                        <span className="font-medium text-white">Code</span>
                    </div>
                    <Select
                        value={language}
                        onValueChange={handleLanguageChange}
                    >
                        <SelectTrigger className="h-8 w-32 border-gray-600 bg-gray-700 text-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-gray-600 bg-gray-700">
                            {LANGUAGES.map((lang) => (
                                <SelectItem
                                    key={lang.value}
                                    value={lang.value}
                                    className="text-white hover:bg-gray-600"
                                >
                                    {lang.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleFormatCode}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        Format Code
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleResetCode}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        <RotateCcw className="mr-1 h-4 w-4" />
                        Reset
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleRunCode}
                        className="bg-green-600 text-white hover:bg-green-700"
                    >
                        <Play className="mr-1 h-4 w-4" />
                        Run Code
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <PanelGroup direction="vertical">
                    {/* Editor Panel */}
                    <Panel defaultSize={60} minSize={30}>
                        <div className="h-full bg-gray-900">
                            <Editor
                                height="100%"
                                language={language}
                                value={code}
                                onChange={(value) => setCode(value || "")}
                                theme="vs-dark"
                                options={{
                                    fontFamily:
                                        "'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', monospace",
                                    fontLigatures: true,
                                    fontSize: 14,
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                }}
                            />
                        </div>
                    </Panel>

                    {/* Resize Handle */}
                    <PanelResizeHandle className="h-1 cursor-row-resize bg-gray-600 transition-colors hover:bg-gray-500" />

                    {/* Bottom Panel */}
                    <Panel defaultSize={40} minSize={20}>
                        <div className="flex h-full flex-col bg-gray-800">
                            <Tabs
                                value={activeTab}
                                onValueChange={setActiveTab}
                                className="flex h-full flex-col"
                            >
                                <TabsList className="w-full flex-shrink-0 justify-start rounded-none border-b border-gray-600 bg-gray-700">
                                    <TabsTrigger
                                        value="testcase"
                                        className="data-[state=active]:bg-gray-600"
                                    >
                                        Testcase
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="result"
                                        className="data-[state=active]:bg-gray-600"
                                    >
                                        Test Result
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent
                                    value="testcase"
                                    className="flex-1 overflow-hidden"
                                >
                                    <div className="flex h-full flex-col">
                                        {/* Test Case Tabs */}
                                        <div className="flex-shrink-0 border-b border-gray-600 p-4">
                                            <div className="flex items-center gap-2">
                                                {testCases.map((testCase) => (
                                                    <div
                                                        key={testCase.id}
                                                        className="flex items-center"
                                                    >
                                                        <Button
                                                            variant={
                                                                activeTestCase ===
                                                                testCase.id
                                                                    ? "default"
                                                                    : "ghost"
                                                            }
                                                            size="sm"
                                                            onClick={() =>
                                                                setActiveTestCase(
                                                                    testCase.id,
                                                                )
                                                            }
                                                            className={`rounded-r-none ${
                                                                activeTestCase ===
                                                                testCase.id
                                                                    ? "bg-gray-600 text-white"
                                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                                            }`}
                                                        >
                                                            Case {testCase.id}
                                                        </Button>
                                                        {testCases.length >
                                                            1 && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    removeTestCase(
                                                                        testCase.id,
                                                                    )
                                                                }
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
                                                    onClick={addTestCase}
                                                    className="text-gray-300 hover:bg-gray-700 hover:text-white"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Test Case Content with ScrollArea */}
                                        <div className="flex-1 overflow-hidden">
                                            <ScrollArea className="h-full">
                                                <div className="p-4">
                                                    {currentTestCase && (
                                                        <div className="space-y-4">
                                                            {currentTestCase.inputs.map(
                                                                (
                                                                    input,
                                                                    index,
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="space-y-2"
                                                                    >
                                                                        <div className="flex items-center justify-between">
                                                                            <div className="flex items-center gap-2">
                                                                                <input
                                                                                    type="text"
                                                                                    value={
                                                                                        input.label
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) =>
                                                                                        updateTestCaseInput(
                                                                                            currentTestCase.id,
                                                                                            index,
                                                                                            "label",
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        )
                                                                                    }
                                                                                    className="min-w-0 flex-shrink-0 rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm font-medium text-white"
                                                                                    placeholder="Label"
                                                                                />
                                                                                <span className="text-gray-300">
                                                                                    =
                                                                                </span>
                                                                            </div>
                                                                            {currentTestCase
                                                                                .inputs
                                                                                .length >
                                                                                1 && (
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={() =>
                                                                                        removeInputFromTestCase(
                                                                                            currentTestCase.id,
                                                                                            index,
                                                                                        )
                                                                                    }
                                                                                    className="text-gray-400 hover:text-red-400"
                                                                                >
                                                                                    <X className="h-3 w-3" />
                                                                                </Button>
                                                                            )}
                                                                        </div>
                                                                        <Textarea
                                                                            value={
                                                                                input.value
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                updateTestCaseInput(
                                                                                    currentTestCase.id,
                                                                                    index,
                                                                                    "value",
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }
                                                                            className="border-gray-600 bg-gray-700 font-mono text-white"
                                                                            rows={
                                                                                2
                                                                            }
                                                                            placeholder="Value"
                                                                        />
                                                                    </div>
                                                                ),
                                                            )}

                                                            {/* Expected Output */}
                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-medium text-gray-300">
                                                                        Expected
                                                                        =
                                                                    </span>
                                                                </div>
                                                                <Textarea
                                                                    value={
                                                                        currentTestCase.expected
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updateTestCaseExpected(
                                                                            currentTestCase.id,
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    className="border-gray-600 bg-gray-700 font-mono text-white"
                                                                    rows={2}
                                                                    placeholder="Expected output"
                                                                />
                                                            </div>

                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    addInputToTestCase(
                                                                        currentTestCase.id,
                                                                    )
                                                                }
                                                                className="text-gray-300 hover:bg-gray-700 hover:text-white"
                                                            >
                                                                <Plus className="mr-1 h-4 w-4" />
                                                                Add Input
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </ScrollArea>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent
                                    value="result"
                                    className="flex-1 overflow-hidden"
                                >
                                    {results.length === 0 ? (
                                        <div className="p-4">
                                            <p className="text-gray-400">
                                                No results yet. Run your code to
                                                see the output.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex h-full flex-col">
                                            {/* Status Header */}
                                            <div className="flex-shrink-0 border-b border-gray-600 p-4">
                                                <div className="flex items-center justify-between">
                                                    <span
                                                        className={`text-lg font-bold ${getStatusColor(overallStatus || "")}`}
                                                    >
                                                        {getStatusText(
                                                            overallStatus || "",
                                                        )}
                                                    </span>
                                                    <span className="text-gray-400">
                                                        Runtime:{" "}
                                                        {Math.max(
                                                            ...results.map(
                                                                (r) =>
                                                                    r.runtime,
                                                            ),
                                                        )}{" "}
                                                        ms
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Test Case Tabs */}
                                            <div className="flex-shrink-0 border-b border-gray-600 p-4">
                                                <div className="flex items-center gap-2">
                                                    {results.map((result) => (
                                                        <Button
                                                            key={
                                                                result.testCaseId
                                                            }
                                                            variant={
                                                                activeResultCase ===
                                                                result.testCaseId
                                                                    ? "default"
                                                                    : "ghost"
                                                            }
                                                            size="sm"
                                                            onClick={() =>
                                                                setActiveResultCase(
                                                                    result.testCaseId,
                                                                )
                                                            }
                                                            className={`relative ${
                                                                activeResultCase ===
                                                                result.testCaseId
                                                                    ? "bg-gray-600 text-white"
                                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                                            }`}
                                                        >
                                                            <div
                                                                className={`absolute -top-1 -right-1 h-2 w-2 rounded-full ${
                                                                    result.status ===
                                                                    "accepted"
                                                                        ? "bg-green-400"
                                                                        : result.status ===
                                                                            "wrong_answer"
                                                                          ? "bg-red-400"
                                                                          : "bg-red-400"
                                                                }`}
                                                            />
                                                            Case{" "}
                                                            {result.testCaseId}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Result Content with ScrollArea */}
                                            <div className="flex-1 overflow-hidden">
                                                <ScrollArea className="h-full">
                                                    <div className="p-4">
                                                        {currentResult &&
                                                            currentResultTestCase && (
                                                                <div className="space-y-4">
                                                                    {/* Error Status Display */}
                                                                    {currentResult.status ===
                                                                        "error" && (
                                                                        <div>
                                                                            <h3 className="mb-4 text-lg font-bold text-red-400">
                                                                                Runtime
                                                                                Error
                                                                            </h3>
                                                                            {currentResult.error && (
                                                                                <ErrorDisplay
                                                                                    error={
                                                                                        currentResult.error
                                                                                    }
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    )}

                                                                    {/* Normal Result Display for non-error cases */}
                                                                    {currentResult.status !==
                                                                        "error" && (
                                                                        <>
                                                                            {/* Input Section */}
                                                                            <div>
                                                                                <h3 className="mb-2 text-sm font-medium text-gray-400">
                                                                                    Input
                                                                                </h3>
                                                                                <div className="space-y-2">
                                                                                    {currentResultTestCase.inputs.map(
                                                                                        (
                                                                                            input,
                                                                                            index,
                                                                                        ) => (
                                                                                            <div
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                className="rounded bg-gray-700 p-3"
                                                                                            >
                                                                                                <div className="text-sm text-gray-400">
                                                                                                    {
                                                                                                        input.label
                                                                                                    }{" "}
                                                                                                    =
                                                                                                </div>
                                                                                                <div className="font-mono text-white">
                                                                                                    {
                                                                                                        input.value
                                                                                                    }
                                                                                                </div>
                                                                                            </div>
                                                                                        ),
                                                                                    )}
                                                                                </div>
                                                                            </div>

                                                                            {/* Output Section */}
                                                                            <div>
                                                                                <h3 className="mb-2 text-sm font-medium text-gray-400">
                                                                                    Output
                                                                                </h3>
                                                                                <div className="rounded bg-gray-700 p-3">
                                                                                    {currentResult.status ===
                                                                                    "wrong_answer" ? (
                                                                                        <div className="font-mono text-white">
                                                                                            {(() => {
                                                                                                const diff =
                                                                                                    highlightDiff(
                                                                                                        currentResult.output,
                                                                                                        currentResult.expected,
                                                                                                    );
                                                                                                if (
                                                                                                    diff.outputHighlighted &&
                                                                                                    Array.isArray(
                                                                                                        diff.outputHighlighted,
                                                                                                    )
                                                                                                ) {
                                                                                                    return (
                                                                                                        <span>
                                                                                                            [
                                                                                                            {diff.outputHighlighted.map(
                                                                                                                (
                                                                                                                    item,
                                                                                                                    index,
                                                                                                                ) => (
                                                                                                                    <span
                                                                                                                        key={
                                                                                                                            index
                                                                                                                        }
                                                                                                                    >
                                                                                                                        <span
                                                                                                                            className={
                                                                                                                                item.isWrong
                                                                                                                                    ? "bg-red-600 text-white"
                                                                                                                                    : ""
                                                                                                                            }
                                                                                                                        >
                                                                                                                            {
                                                                                                                                item.value
                                                                                                                            }
                                                                                                                        </span>
                                                                                                                        {index <
                                                                                                                            diff
                                                                                                                                .outputHighlighted
                                                                                                                                .length -
                                                                                                                                1 &&
                                                                                                                            ","}
                                                                                                                    </span>
                                                                                                                ),
                                                                                                            )}

                                                                                                            ]
                                                                                                        </span>
                                                                                                    );
                                                                                                }
                                                                                                return currentResult.output;
                                                                                            })()}
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div className="font-mono text-white">
                                                                                            {
                                                                                                currentResult.output
                                                                                            }
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>

                                                                            {/* Expected Section */}
                                                                            <div>
                                                                                <h3 className="mb-2 text-sm font-medium text-gray-400">
                                                                                    Expected
                                                                                </h3>
                                                                                <div className="rounded bg-gray-700 p-3">
                                                                                    {currentResult.status ===
                                                                                    "wrong_answer" ? (
                                                                                        <div className="font-mono text-white">
                                                                                            {(() => {
                                                                                                const diff =
                                                                                                    highlightDiff(
                                                                                                        currentResult.output,
                                                                                                        currentResult.expected,
                                                                                                    );
                                                                                                if (
                                                                                                    diff.expectedHighlighted &&
                                                                                                    Array.isArray(
                                                                                                        diff.expectedHighlighted,
                                                                                                    )
                                                                                                ) {
                                                                                                    return (
                                                                                                        <span>
                                                                                                            [
                                                                                                            {diff.expectedHighlighted.map(
                                                                                                                (
                                                                                                                    item,
                                                                                                                    index,
                                                                                                                ) => (
                                                                                                                    <span
                                                                                                                        key={
                                                                                                                            index
                                                                                                                        }
                                                                                                                    >
                                                                                                                        <span
                                                                                                                            className={
                                                                                                                                item.isCorrect
                                                                                                                                    ? "bg-green-600 text-white"
                                                                                                                                    : ""
                                                                                                                            }
                                                                                                                        >
                                                                                                                            {
                                                                                                                                item.value
                                                                                                                            }
                                                                                                                        </span>
                                                                                                                        {index <
                                                                                                                            diff
                                                                                                                                .expectedHighlighted
                                                                                                                                .length -
                                                                                                                                1 &&
                                                                                                                            ","}
                                                                                                                    </span>
                                                                                                                ),
                                                                                                            )}

                                                                                                            ]
                                                                                                        </span>
                                                                                                    );
                                                                                                }
                                                                                                return currentResult.expected;
                                                                                            })()}
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div className="font-mono text-white">
                                                                                            {
                                                                                                currentResult.expected
                                                                                            }
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            )}
                                                    </div>
                                                </ScrollArea>
                                            </div>
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </div>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    );
}
