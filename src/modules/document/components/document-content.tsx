"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { codeDataAtom } from "@/modules/code-editor/atom/code";
import { languageDataAtom } from "@/modules/code-editor/atom/language";
import { testCaseDataAtom } from "@/modules/code-editor/atom/testcase";
import { TextEditor } from "@/modules/text-editor/components/text-editor";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { useHydrateAtoms } from "jotai/utils";
import { api } from "../../../../convex/_generated/api";
import { CodeArea } from "./code-area";

type Props = {
    preloadedSolution: Preloaded<typeof api.solutions.get>;
};

export const DocumentContent = ({ preloadedSolution }: Props) => {
    const solution = usePreloadedQuery(preloadedSolution);

    useHydrateAtoms([
        [codeDataAtom, solution?.code],
        [languageDataAtom, solution?.language],
        [testCaseDataAtom, solution?.testCases],
    ]);

    return (
        <div className="flex-1 overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={30}>
                    <TextEditor />
                </ResizablePanel>
                <ResizableHandle withHandle className="mx-2" />
                <ResizablePanel defaultSize={50} minSize={30}>
                    <CodeArea />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};
