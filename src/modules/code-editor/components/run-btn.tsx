import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { Play } from "lucide-react";
import { useState } from "react";
import { codeAtom } from "../atom/code";
import { languagesAtom } from "../atom/language";
import { testCasesAtoms } from "../atom/testcase";
import { JUDGE0_LANGUAGE_ID_MAP } from "../constants";
import { generateStdinFromInputs, runJudge0 } from "../lib/judge0";

export const RunCodeButton = () => {
    const language = useAtomValue(languagesAtom);
    const code = useAtomValue(codeAtom);
    const testCases = useAtomValue(testCasesAtoms);

    const [isPending, setIsPending] = useState(false);

    const onClick = async () => {
        try {
            setIsPending(true);
            const languageId = JUDGE0_LANGUAGE_ID_MAP[language];

            const results = await Promise.all(
                testCases.map(async (testCase) => {
                    const stdin = generateStdinFromInputs(testCase.inputs);

                    const result = await runJudge0({
                        languageId,
                        sourceCode: code,
                        stdin,
                    });

                    const output = (result.stdout || "").trim();
                    const expected = testCase.expected.trim();

                    return {
                        testCaseId: testCase.id,
                        status:
                            output === expected ? "accepted" : "wrong_answer",
                        output,
                        expected,
                        stderr: result.stderr,
                    };
                }),
            );

            console.log(results);
        } catch (error) {
            console.error("Error running code:", error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Hint message="Run">
            <Button
                size="icon"
                variant="ghost"
                className="dark:hover:bg-input/50 size-8 rounded-sm"
                onClick={onClick}
                disabled={isPending || !code || !testCases.length || !language}
            >
                <Play />
            </Button>
        </Hint>
    );
};
