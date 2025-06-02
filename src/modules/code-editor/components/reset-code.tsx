import { useAtomValue, useSetAtom } from "jotai";
import { RotateCcw } from "lucide-react";
import { codeAtom, codeDataAtom } from "../atom/code";
import { ActionSelector } from "./action-selector";

export const ResetCodeButton = () => {
    const setCode = useSetAtom(codeAtom);
    const defaultCode = useAtomValue(codeDataAtom);

    const onClick = () => {
        setCode(defaultCode || "");
    };

    return (
        <ActionSelector title="Reset Code" onClick={onClick}>
            <RotateCcw />
        </ActionSelector>
    );
};
