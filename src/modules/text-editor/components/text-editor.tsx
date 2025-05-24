"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useSyncStatus } from "@liveblocks/react";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import {
    EditorCommand,
    EditorCommandEmpty,
    EditorCommandItem,
    EditorCommandList,
    EditorContent,
    EditorRoot,
    ImageResizer,
    handleCommandNavigation,
    handleImageDrop,
} from "novel";
import { useState } from "react";
import { uploadFn } from "../actions/image-upload";
import { defaultExtensions } from "../lib/extensions";
import GenerativeMenuSwitch from "./generative/generative-menu-switch";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { MathSelector } from "./selectors/math-selector";
import { NodeSelector } from "./selectors/node-selector";
import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";

import { onPast } from "../lib/content-paste";

type Props = {
    size: number;
};

export const TextEditor = ({ size }: Props) => {
    const liveblocks = useLiveblocksExtension();
    const extensions = [...defaultExtensions, slashCommand, liveblocks];

    const [openNode, setOpenNode] = useState(false);
    const [openColor, setOpenColor] = useState(false);
    const [openLink, setOpenLink] = useState(false);
    const [openAI, setOpenAI] = useState(false);

    const syncStatus = useSyncStatus({ smooth: true });

    return (
        <div className="rounded-m h-full overflow-hidden rounded-md border dark:bg-[#101011]">
            <div className="bg-accent relative flex h-10 items-center justify-end border-b px-4">
                <p className="text-muted-foreground text-sm">
                    {syncStatus === "synchronizing" ? "Unsaved" : "Saved"}
                </p>
            </div>

            <ScrollArea
                className="h-[calc(100vh-126px)]"
                style={{ width: `calc(${size}vw - 22px)` }}
                data-type="editor"
            >
                <EditorRoot>
                    <EditorContent
                        extensions={extensions}
                        className="relative h-[calc(100vh-126px)] w-full p-6 dark:bg-[#101011]"
                        editorProps={{
                            handleDOMEvents: {
                                keydown: (_view, event) =>
                                    handleCommandNavigation(event),
                            },
                            handlePaste: (view, event) => onPast(view, event),
                            handleDrop: (view, event, _slice, moved) =>
                                handleImageDrop(view, event, moved, uploadFn),
                            attributes: {
                                class: "prose dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
                            },
                        }}
                        slotAfter={<ImageResizer />}
                        immediatelyRender={false}
                    >
                        <EditorCommand className="border-muted bg-background z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border px-1 py-2 shadow-md transition-all">
                            <EditorCommandEmpty className="text-muted-foreground px-2">
                                No results
                            </EditorCommandEmpty>
                            <EditorCommandList>
                                {suggestionItems.map((item) => (
                                    <EditorCommandItem
                                        value={item.title}
                                        onCommand={(val) => {
                                            if (!item?.command) {
                                                return;
                                            }

                                            item.command(val);
                                        }}
                                        className="hover:bg-accent aria-selected:bg-accent flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm"
                                        key={item.title}
                                    >
                                        <div className="border-muted bg-background flex h-10 w-10 items-center justify-center rounded-md border">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                {item.title}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {item.description}
                                            </p>
                                        </div>
                                    </EditorCommandItem>
                                ))}
                            </EditorCommandList>
                        </EditorCommand>

                        <GenerativeMenuSwitch
                            open={openAI}
                            onOpenChange={setOpenAI}
                        >
                            <Separator orientation="vertical" />
                            <NodeSelector
                                open={openNode}
                                onOpenChange={setOpenNode}
                            />
                            <Separator orientation="vertical" />
                            <LinkSelector
                                open={openLink}
                                onOpenChange={setOpenLink}
                            />
                            <Separator orientation="vertical" />
                            <MathSelector />
                            <Separator orientation="vertical" />
                            <TextButtons />
                            <Separator orientation="vertical" />
                            <ColorSelector
                                open={openColor}
                                onOpenChange={setOpenColor}
                            />
                            <Separator orientation="vertical" />
                        </GenerativeMenuSwitch>
                    </EditorContent>
                </EditorRoot>
            </ScrollArea>
        </div>
    );
};
