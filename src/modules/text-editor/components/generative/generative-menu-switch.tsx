import Magic from "@/components/icons/magic";
import { Button } from "@/components/ui/button";
import { EditorBubble, removeAIHighlight, useEditor } from "novel";
import { Fragment, type ReactNode, useEffect } from "react";
import { AISelector } from "./ai-selector";

type Props = {
    children: ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const GenerativeMenuSwitch = ({
    children,
    open,
    onOpenChange,
}: Props) => {
    const { editor } = useEditor();

    useEffect(() => {
        if (!open && editor) removeAIHighlight(editor);
    }, [open, editor]);

    return (
        <EditorBubble
            tippyOptions={{
                placement: open ? "bottom-start" : "top-start",
                onHidden: () => {
                    if (!editor) {
                        return;
                    }

                    onOpenChange(false);
                    editor.chain().unsetHighlight().run();
                },
            }}
            className="border-muted bg-background flex h-8 w-fit max-w-[40vw] items-center rounded-md border shadow-xl"
        >
            {open && <AISelector open={open} onOpenChange={onOpenChange} />}
            {!open && (
                <Fragment>
                    <Button
                        className="gap-1 rounded-none text-purple-500"
                        variant="ghost"
                        onClick={() => onOpenChange(true)}
                        size="sm"
                    >
                        <Magic className="h-5 w-5" />
                        Ask AI
                    </Button>
                    {children}
                </Fragment>
            )}
        </EditorBubble>
    );
};
