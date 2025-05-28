import { ScrollArea } from "@/components/ui/scroll-area";
import { useImmer } from "use-immer";
import { highlightDiff } from "../../lib/utils";
import { TestCase, TestResult } from "../../types";
import { EmptyResultDisplay } from "./empty-result";
import { ErrorDisplay } from "./error-display";
import { HeaderResult } from "./header-results";
import { InputResultsSection } from "./input-section";
import { OutputResultSection } from "./output-section";
import { ResultsTestcaseTabs } from "./testcase-tabs";

const testCases: TestCase[] = [
    {
        id: "1",
        inputs: [
            {
                label: "nums",
                value: "[2,7,11,15,2,7,11,15,2,7,11,15,2,7,11,15,2,7,11,15,2,7,11,15,2,7,11,15, 2,7,11,15,2,7,11,15,2,7,11,15,2,7,11,15,2,7,11,15,2,7,11,15,2,7,11,15]",
            },
            {
                label: "num2",
                value: "[2,7,11,15,2,7,11,15,2,7,11,15,2,7,11,15,2,7,11,15,2,7,11,15,2,7,11,15, 2,7,11,15,2,7,11,15,2,7,11,15,2,7,11,15,2,7,11,15,2,7,11,15,2,7,11,15]",
            },
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

const initialResults: TestResult[] = [
    {
        testCaseId: "1",
        output: "[1,0]",
        expected: "[1,0]",
        status: "accepted",
        runtime: 1,
    },
    {
        testCaseId: "2",
        output: "[2,1]",
        expected: "[1,1]",
        status: "wrong_answer",
        runtime: 1,
    },
    {
        testCaseId: "3",
        output: "[1,0]",
        expected: "[2,1]",
        status: "wrong_answer",
        runtime: 1,
    },
];

const errorResults: TestResult[] = [
    {
        testCaseId: "1",
        output: "",
        expected: "[0,1]",
        status: "error",
        runtime: 0,
        error: "Line 6 in solution.js\n    if (target - num in pairIdx) {\n                        ^\n\nReferenceError: pairIdx is not defined\n    Line 6: Char 29 in solution.js (twoSum)\n    Line 25: Char 19 in solution.js (Object.<anonymous>)\n    Line 16: Char 8 in runner.js (Object.runner)\n    Line 12: Char 26 in solution.js (Object.<anonymous>)\n    at Module._compile (node:internal/modules/cjs/loader:1554:14)\n    at Object..js (node:internal/modules/cjs/loader:1706:10)\n    at Module.load (node:internal/modules/cjs/loader:1289:32)\n    at Function.Module._load (node:internal/modules/cjs/loader:1105:12)\n    at Module.require (node:internal/modules/cjs/loader:1329:19)\n    at require (node:internal/modules/cjs/helpers:102:18)\n    at Object.<anonymous> (/tmp/solution.js:1:1)\n    at Module._compile (node:internal/modules/cjs/loader:1554:14)",
    },
    {
        testCaseId: "2",
        output: "",
        expected: "[1,2]",
        status: "error",
        runtime: 0,
        error: "Line 6 in solution.js\n    if (target - num in pairIdx) {\n                        ^\n\nReferenceError: pairIdx is not defined\n    Line 6: Char 29 in solution.js (twoSum)\n    Line 25: Char 19 in solution.js (Object.<anonymous>)\n    Line 16: Char 8 in runner.js (Object.runner)\n    Line 12: Char 26 in solution.js (Object.<anonymous>)\n    at Module._compile (node:internal/modules/cjs/loader:1554:14)\n    at Object..js (node:internal/modules/cjs/loader:1706:10)\n    at Module.load (node:internal/modules/cjs/loader:1289:32)\n    at Function.Module._load (node:internal/modules/cjs/loader:1105:12)\n    at Module.require (node:internal/modules/cjs/loader:1329:19)\n    at require (node:internal/modules/cjs/helpers:102:18)\n    at Object.<anonymous> (/tmp/solution.js:1:1)\n    at Module._compile (node:internal/modules/cjs/loader:1554:14)",
    },
    {
        testCaseId: "3",
        output: "",
        expected: "[0,1]",
        status: "error",
        runtime: 0,
        error: "Line 6 in solution.js\n    if (target - num in pairIdx) {\n                        ^\n\nReferenceError: pairIdx is not defined\n    Line 6: Char 29 in solution.js (twoSum)\n    Line 25: Char 19 in solution.js (Object.<anonymous>)\n    Line 16: Char 8 in runner.js (Object.runner)\n    Line 12: Char 26 in solution.js (Object.<anonymous>)\n    at Module._compile (node:internal/modules/cjs/loader:1554:14)\n    at Object..js (node:internal/modules/cjs/loader:1706:10)\n    at Module.load (node:internal/modules/cjs/loader:1289:32)\n    at Function.Module._load (node:internal/modules/cjs/loader:1105:12)\n    at Module.require (node:internal/modules/cjs/loader:1329:19)\n    at require (node:internal/modules/cjs/helpers:102:18)\n    at Object.<anonymous> (/tmp/solution.js:1:1)\n    at Module._compile (node:internal/modules/cjs/loader:1554:14)",
    },
];

export const Results = () => {
    const [results, setResults] = useImmer<TestResult[]>(initialResults);
    const [activeResultCase, setActiveResultCase] = useImmer(
        results[0]?.testCaseId,
    );

    const currentResult = results.find(
        (r) => r.testCaseId === activeResultCase,
    );
    const currentResultTestCase = testCases.find(
        (tc) => tc.id === activeResultCase,
    );

    if (results.length === 0 || !currentResult) {
        return <EmptyResultDisplay />;
    }

    if (currentResult.error) {
        return <ErrorDisplay error={currentResult.error} />;
    }

    const diff = highlightDiff(currentResult.output, currentResult.expected);

    return (
        <div className="flex h-full flex-col gap-y-4">
            <HeaderResult results={results} />

            <ResultsTestcaseTabs
                results={results}
                active={activeResultCase}
                onChange={setActiveResultCase}
            />

            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full px-3">
                    {currentResult && currentResultTestCase && (
                        <div className="space-y-4">
                            <InputResultsSection
                                values={currentResultTestCase.inputs}
                            />

                            <OutputResultSection
                                label="Output"
                                status={currentResult.status}
                                value={currentResult.output}
                                diff={diff.outputHighlighted}
                            />

                            <OutputResultSection
                                label="Expected"
                                status={currentResult.status}
                                value={currentResult.expected}
                                diff={diff.expectedHighlighted}
                            />
                        </div>
                    )}
                </ScrollArea>
            </div>
        </div>
    );
};
