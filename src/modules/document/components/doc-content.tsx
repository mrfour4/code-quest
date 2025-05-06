"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Canvas } from "@/modules/canvas/components/canvas";
import { TextEditor } from "@/modules/text-editor";
import { useState } from "react";
import { CodeEditor } from "./code-editor";
import { InputCodeSection } from "./input-code-section";
import { TabValue } from "./types";

export const DocumentContent = () => {
    const [activeTab, setActiveTab] = useState<TabValue>(TabValue.Editor);

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} minSize={30}>
                <TextEditor />
            </ResizablePanel>
            <ResizableHandle withHandle className="mx-2" />
            <ResizablePanel defaultSize={50} minSize={30}>
                <Tabs
                    value={activeTab}
                    onValueChange={(value) => setActiveTab(value as TabValue)}
                    className="h-full overflow-hidden rounded-md border"
                >
                    <div className="bg-accent flex h-10 items-center justify-between border-b">
                        <TabsList>
                            <TabsTrigger value={TabValue.Editor}>
                                Editor
                            </TabsTrigger>
                            <Separator
                                orientation="vertical"
                                className="mx-1 !h-4/5"
                            />
                            <TabsTrigger value={TabValue.Canvas}>
                                Canvas
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent
                        value={TabValue.Editor}
                        className="h-[calc(100%-40px)] p-0 data-[state=active]:flex data-[state=active]:flex-col"
                    >
                        <ResizablePanelGroup direction="vertical">
                            <ResizablePanel defaultSize={60} minSize={20}>
                                <CodeEditor />
                            </ResizablePanel>

                            <ResizableHandle withHandle />

                            <ResizablePanel defaultSize={40} minSize={20}>
                                <InputCodeSection />
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </TabsContent>
                    <TabsContent
                        value={TabValue.Canvas}
                        className="dark:bg-[#101011]"
                    >
                        <Canvas />
                    </TabsContent>
                </Tabs>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};
