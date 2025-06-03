import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useAtomValue, useSetAtom } from "jotai";
import { Play } from "lucide-react";
import { useGetTemplate } from "../api/template";
import { codeAtom } from "../atom/code";
import { executeCodeAtom, executingAtom } from "../atom/result/execution";

export const RunCodeButton = () => {
    const executeCode = useSetAtom(executeCodeAtom);
    const isRunning = useAtomValue(executingAtom);
    const code = useAtomValue(codeAtom);

    const { data: template } = useGetTemplate();

    const onClick = async () => {
        let sourceCode = code;

        if (template?.isPublished) {
            sourceCode = `${template.head}\n${code}\n${template.tail}`;
        }

        await executeCode(sourceCode);
    };

    return (
        <Hint message="Run">
            <Button
                size="icon"
                variant="ghost"
                className="dark:hover:bg-input/50 size-8 rounded-sm"
                onClick={onClick}
                disabled={isRunning}
            >
                <Play />
            </Button>
        </Hint>
    );
};
