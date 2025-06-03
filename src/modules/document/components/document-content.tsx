"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useGetTemplate } from "@/modules/code-editor/api/template";
import { codeDataAtom } from "@/modules/code-editor/atom/code";
import { testCaseDataAtom } from "@/modules/code-editor/atom/testcase";
import { TextEditor } from "@/modules/text-editor/components/text-editor";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import { CodeArea } from "./code-area";

type Props = {
    preLoadedTestCases: Preloaded<typeof api.testCases.get>;
    preLoadedDocument: Preloaded<typeof api.documents.get>;
};

export const DocumentContent = ({
    preLoadedTestCases,
    preLoadedDocument,
}: Props) => {
    const testCases = usePreloadedQuery(preLoadedTestCases);
    const document = usePreloadedQuery(preLoadedDocument);

    useHydrateAtoms([[testCaseDataAtom, testCases]]);

    const { data: template } = useGetTemplate();
    const setCodeData = useSetAtom(codeDataAtom);

    useEffect(() => {
        setCodeData(template?.code ?? "");
    }, [template, setCodeData]);

    return (
        <div className="flex-1 overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={30}>
                    <TextEditor editable={document.type === "draft"} />
                </ResizablePanel>
                <ResizableHandle withHandle className="mx-2" />
                <ResizablePanel defaultSize={50} minSize={30}>
                    <CodeArea isPublished={document.type === "published"} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};
