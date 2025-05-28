"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TextEditor } from "@/modules/text-editor/components/text-editor";
import { CodeArea } from "./code-area";

export const DocumentContent = () => {
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
