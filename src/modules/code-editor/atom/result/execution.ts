import { TestCaseTab } from "@/modules/document/types";
import { atom } from "jotai";
import { toast } from "sonner";
import { resultsAtom } from ".";
import { runCode } from "../../actions/execute";
import { generateStdinFromInputs } from "../../lib/execute";
import { TestResult } from "../../types";
import { codeAtom } from "../code";
import { languagesAtom } from "../language";
import { activeTabAtom } from "../tab";
import { testCasesAtoms } from "../testcase";

export const executingAtom = atom<boolean>(false);

export const executeCodeAtom = atom(null, async (get, set) => {
    const language = get(languagesAtom);
    const code = get(codeAtom);
    const testCases = get(testCasesAtoms);

    try {
        set(executingAtom, true);
        set(activeTabAtom, TestCaseTab.Result);
        const results: TestResult[] = await Promise.all(
            testCases.map(async (testCase) => {
                const stdin = generateStdinFromInputs(testCase.inputs);
                const result = await runCode({
                    languageId: language.id,
                    sourceCode: code,
                    stdin,
                    expectedOutput: testCase.expected,
                });
                console.log("🚀 ~ testCases.map ~ result:", result);

                const output = (result.stdout || "").trim();
                const expected = testCase.expected;
                const runtime = parseFloat(result.time || "0");
                const error =
                    result.error ||
                    result.stderr ||
                    result.compile_output ||
                    "";

                return {
                    testCaseId: testCase.id,
                    status: result.status?.description || "Error",
                    output,
                    expected,
                    error,
                    runtime,
                };
            }),
        );

        set(resultsAtom, results);
    } catch (error) {
        console.log("Error running code:", error);
        toast.error(
            "Error running code: " +
                (error instanceof Error ? error.message : String(error)),
        );
    } finally {
        set(executingAtom, false);
    }
});
