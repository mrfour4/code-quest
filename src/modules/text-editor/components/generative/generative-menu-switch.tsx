import Magic from "@/components/icons/magic";
import { Button } from "@/components/ui/button";
import { EditorBubble, removeAIHighlight, useEditor } from "novel";
import { type ReactNode, useEffect } from "react";
import { AISelector } from "./ai-selector";
interface Props {
    children: ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const GenerativeMenuSwitch = ({
    children,
    open,
    onOpenChange,
}: Props) => {
    const { editor } = useEditor();

    useEffect(() => {
        if (!open && editor) removeAIHighlight(editor);

        if (open && editor) {
            editor.view.dom.classList.add("novel-ai-active");
        }

        return () => {
            editor?.view.dom.classList.remove("novel-ai-active");
        };
    }, [open, editor]);

    return (
        <EditorBubble
            tippyOptions={{
                placement: "bottom-start",
                interactive: true,

                onHidden: () => {
                    if (!editor) {
                        return;
                    }

                    onOpenChange(false);
                    editor.chain().unsetHighlight().run();
                },
            }}
            className="border-muted bg-background flex w-fit max-w-[90vw] overflow-hidden rounded-md border shadow-xl"
        >
            {open && <AISelector onOpenChange={onOpenChange} />}
            {!open && (
                <>
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
                </>
            )}
        </EditorBubble>
    );
};
