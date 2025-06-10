"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { useSyncStatus } from "@liveblocks/react/suspense";
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
import { uploadImageFn } from "../actions/image-upload";
import { defaultExtensions } from "../lib/extensions";
import { GenerativeMenuSwitch } from "./generative/generative-menu-switch";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { slashCommand, suggestionItems } from "./slash-command";

import { FileText } from "lucide-react";
import { useUpdateDocumentState } from "../hooks/use-update-state";
import { onPaste } from "../lib/content-paste";
import { StyleSelector } from "./selectors/style-selector";

type Props = {
    editable: boolean;
};

export const TextEditorContent = ({ editable }: Props) => {
    const liveblocks = useLiveblocksExtension({
        offlineSupport_experimental: true,
    });
    const extensions = [...defaultExtensions, slashCommand, liveblocks];

    const [openAI, setOpenAI] = useState(false);
    const [openStyle, setOpenStyle] = useState(false);

    const syncStatus = useSyncStatus({ smooth: true });

    const updateDocumentState = useUpdateDocumentState();

    return (
        <div className="bg-border flex h-full w-full flex-col overflow-hidden rounded-md border">
            <div className="bg-accent relative flex h-10 w-full shrink-0 items-center justify-between rounded-t-md border-b px-4">
                <div className="flex items-center gap-1.5 space-x-2 text-sm">
                    <FileText className="size-4 text-blue-500" />
                    Document
                </div>

                <p className="text-muted-foreground text-sm">
                    {syncStatus === "synchronizing" ? "Unsaved" : "Saved"}
                </p>
            </div>

            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full" data-type="editor">
                    <EditorRoot>
                        <EditorContent
                            extensions={extensions}
                            editable={editable}
                            className="w-full px-4 py-6 text-justify lg:px-6 lg:py-12"
                            editorProps={{
                                handleDOMEvents: {
                                    keydown: (_view, event) =>
                                        handleCommandNavigation(event),
                                },
                                handlePaste: (view, event) =>
                                    onPaste(view, event),
                                handleDrop: (view, event, _slice, moved) =>
                                    handleImageDrop(
                                        view,
                                        event,
                                        moved,
                                        uploadImageFn,
                                    ),
                                // handleTextInput: updateDocumentState,

                                attributes: {
                                    class: "prose dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full ",
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
                                <LinkSelector />
                                <Separator orientation="vertical" />
                                <StyleSelector
                                    open={openStyle}
                                    onOpenChange={setOpenStyle}
                                />
                                <Separator orientation="vertical" />
                                <ColorSelector />
                            </GenerativeMenuSwitch>
                        </EditorContent>
                    </EditorRoot>
                </ScrollArea>
            </div>
        </div>
    );
};
