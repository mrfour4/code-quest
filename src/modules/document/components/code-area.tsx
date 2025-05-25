import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Canvas } from "@/modules/canvas/components/canvas";
import { CodeEditor } from "@/modules/code-editor/components/code-editor";
import { CodeXml, Palette } from "lucide-react";
import { useState } from "react";
import { TestCaseArea } from "./testcase-area";
import { TabValue } from "./types";

export const CodeArea = () => {
    const [activeTab, setActiveTab] = useState<TabValue>(TabValue.Editor);
    const [sizes, setSizes] = useState<number[]>([]);

    return (
        <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as TabValue)}
            className="h-full gap-0 overflow-hidden rounded-md"
        >
            <div className="bg-accent flex h-10 items-center justify-between px-2">
                <TabsList>
                    <TabsTrigger value={TabValue.Editor}>
                        <CodeXml className="text-green-500" />
                        Code
                    </TabsTrigger>
                    <Separator orientation="vertical" className="mx-1 !h-4/5" />
                    <TabsTrigger value={TabValue.Canvas}>
                        <Palette className="text-blue-500" />
                        Canvas
                    </TabsTrigger>
                </TabsList>
            </div>
            <TabsContent
                value={TabValue.Editor}
                className="h-[calc(100%-40px)] p-0 data-[state=active]:flex data-[state=active]:flex-col"
            >
                <ResizablePanelGroup
                    direction="vertical"
                    onLayout={(sizes) => {
                        setSizes(sizes);
                    }}
                >
                    <ResizablePanel defaultSize={60} minSize={20}>
                        <CodeEditor size={sizes[0]} />
                    </ResizablePanel>

                    <ResizableHandle withHandle className="my-2" />

                    <ResizablePanel defaultSize={40} minSize={20}>
                        <TestCaseArea />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </TabsContent>
            <TabsContent
                value={TabValue.Canvas}
                className="mt-2 border border-t dark:bg-[#101011]"
            >
                <Canvas />
            </TabsContent>
        </Tabs>
    );
};
