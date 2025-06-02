import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useAtomValue, useSetAtom } from "jotai";
import { Play } from "lucide-react";
import { executeCodeAtom, executingAtom } from "../atom/result/execution";

export const RunCodeButton = () => {
    const executeCode = useSetAtom(executeCodeAtom);
    const isRunning = useAtomValue(executingAtom);

    const onClick = async () => {
        await executeCode();
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
