"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TextEditor } from "@/modules/text-editor/components/text-editor";
import { useState } from "react";
import { CodeArea } from "./code-area";

export const DocumentContent = () => {
    const [sizes, setSizes] = useState<number[]>([]);

    return (
        <ResizablePanelGroup
            direction="horizontal"
            onLayout={(sizes) => {
                setSizes(sizes);
            }}
        >
            <ResizablePanel defaultSize={50} minSize={30}>
                <TextEditor size={sizes[0]} />
            </ResizablePanel>
            <ResizableHandle withHandle className="mx-2" />
            <ResizablePanel defaultSize={50} minSize={30}>
                <CodeArea />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};
