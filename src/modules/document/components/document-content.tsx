"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useHydrateTemplate } from "@/modules/code-editor/hooks/use-hydrate-template";
import { useHydrateTestCases } from "@/modules/code-editor/hooks/use-hydrate-testcases";
import { TextEditor } from "@/modules/text-editor/components/text-editor";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { CodeArea } from "./code-area";

type Props = {
    preLoadedDocument: Preloaded<typeof api.documents.get>;
};

export const DocumentContent = ({ preLoadedDocument }: Props) => {
    const document = usePreloadedQuery(preLoadedDocument);

    useHydrateTestCases();
    useHydrateTemplate();

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
