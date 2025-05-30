import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { Play } from "lucide-react";
import { codeAtom } from "../atom/code";
import { languagesAtom } from "../atom/language";
import { testCasesAtoms } from "../atom/testcase";

export const RunCodeButton = () => {
    const language = useAtomValue(languagesAtom);
    const code = useAtomValue(codeAtom);
    const testCases = useAtomValue(testCasesAtoms);

    const onClick = () => {
        console.log("Running code with the following parameters:");
        console.log("Language:", language);
        console.log("Code:", code);
        console.log("Test Cases:", testCases);
    };

    return (
        <Hint message="Run">
            <Button
                size="icon"
                variant="ghost"
                className="dark:hover:bg-input/50 size-8 rounded-sm"
                onClick={onClick}
            >
                <Play />
            </Button>
        </Hint>
    );
};
