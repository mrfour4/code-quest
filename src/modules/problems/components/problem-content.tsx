"use client";

import { ClientOnly } from "@/components/client-only";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useHydrateTemplate } from "@/modules/code-editor/hooks/use-hydrate-template";
import { useHydrateTestCases } from "@/modules/code-editor/hooks/use-hydrate-testcases";
import { CodeArea } from "@/modules/document/components/code-area";
import { TextEditor } from "@/modules/text-editor/components/text-editor";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

type Props = {
    preLoadedProblem: Preloaded<typeof api.documents.getPublished>;
};

export const ProblemContent = ({ preLoadedProblem }: Props) => {
    const document = usePreloadedQuery(preLoadedProblem);

    useHydrateTestCases();
    useHydrateTemplate();

    const isMobile = useMediaQuery("(max-width: 767px)");

    if (isMobile) {
        return (
            <div className="flex overflow-hidden">
                <TextEditor editable={document.type === "draft"} />
            </div>
        );
    }

    return (
        <ClientOnly>
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
        </ClientOnly>
    );
};
