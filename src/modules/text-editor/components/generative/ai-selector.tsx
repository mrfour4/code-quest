"use client";

import { Command, CommandInput } from "@/components/ui/command";

import CrazySpinner from "@/components/icons/crazy-spinner";
import Magic from "@/components/icons/magic";
import { Button } from "@/components/ui/button";
import ResizableScrollArea from "@/modules/text-editor/components/resizable-scroll-area";
import { useCompletion } from "@ai-sdk/react";
import { ArrowUp } from "lucide-react";
import { addAIHighlight, useEditor } from "novel";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MarkdownWrapper } from "../markdown-wrapper";
import { AICompletionCommands } from "./ai-completion-command";
import { AISelectorCommands } from "./ai-selector-commands";

type Props = {
    onOpenChange: (open: boolean) => void;
};

export function AISelector({ onOpenChange }: Props) {
    const { editor } = useEditor();
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (!editor) {
            return;
        }

        editor.view.dom.classList.add("novel-ai-answer");

        return () => {
            editor.view.dom.classList.remove("novel-ai-answer");
        };
    }, [editor]);

    const { completion, complete, isLoading } = useCompletion({
        // id: "novel",
        api: "/api/generate",
        onResponse: (response) => {
            if (response.status === 429) {
                toast.error("You have reached your request limit for the day.");
                return;
            }
        },
        onError: (e) => {
            toast.error(e.message);
        },
    });

    const hasCompletion = completion.length > 0;

    const onSubmit = () => {
        if (!editor) {
            return;
        }

        if (completion)
            return complete(completion, {
                body: {
                    option: "zap",
                    command: inputValue,
                },
            }).then(() => setInputValue(""));

        const slice = editor.state.selection.content();
        const text = editor.storage.markdown.serializer.serialize(
            slice.content,
        );

        complete(text, {
            body: {
                option: "zap",
                command: inputValue,
            },
        }).then(() => setInputValue(""));
    };

    return (
        <Command className="w-auto">
            {hasCompletion && (
                <ResizableScrollArea height={300} minWidth={350} maxWidth={600}>
                    <div className="w-full overflow-hidden p-2 px-4">
                        <div className="prose dark:prose-invert prose-sm overflow-wrap-anywhere w-full max-w-none break-words">
                            <MarkdownWrapper>{completion}</MarkdownWrapper>
                        </div>
                    </div>
                </ResizableScrollArea>
            )}

            {isLoading && (
                <div className="flex h-12 w-full items-center px-4 text-sm font-medium text-purple-500">
                    <Magic className="mr-2 h-4 w-4 shrink-0" />
                    AI is thinking
                    <div className="mt-1 ml-2">
                        <CrazySpinner />
                    </div>
                </div>
            )}
            {!isLoading && (
                <>
                    <form
                        className="relative"
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}
                    >
                        <CommandInput
                            value={inputValue}
                            onValueChange={setInputValue}
                            autoFocus
                            placeholder={
                                hasCompletion
                                    ? "Tell AI what to do next"
                                    : "Ask AI to edit or generate..."
                            }
                            onFocus={() => {
                                if (!editor) {
                                    return;
                                }

                                addAIHighlight(editor);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    onSubmit();
                                }
                            }}
                            className="pr-8"
                        />
                        <Button
                            size="icon"
                            className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 rounded-full bg-purple-500 hover:bg-purple-900"
                            type="submit"
                        >
                            <ArrowUp className="h-4 w-4" />
                        </Button>
                    </form>
                    {hasCompletion ? (
                        <AICompletionCommands
                            onDiscard={() => {
                                if (!editor) {
                                    return;
                                }

                                editor.chain().unsetHighlight().focus().run();
                                onOpenChange(false);
                                editor.view.dom.classList.remove(
                                    "novel-ai-active",
                                );
                            }}
                            completion={completion}
                        />
                    ) : (
                        <AISelectorCommands
                            onSelect={(value, option) =>
                                complete(value, { body: { option } })
                            }
                        />
                    )}
                </>
            )}
        </Command>
    );
}
