import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Bird,
    BoldIcon,
    CodeIcon,
    ItalicIcon,
    StrikethroughIcon,
    UnderlineIcon,
} from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";
import type { SelectorItem } from "./node-selector";

export const TextButtons = () => {
    const { editor } = useEditor();
    if (!editor) return null;
    const items: SelectorItem[] = [
        {
            name: "bold",
            isActive: (editor) => editor?.isActive("bold") ?? false,
            command: (editor) => editor?.chain().focus().toggleBold().run(),
            icon: BoldIcon,
        },
        {
            name: "italic",
            isActive: (editor) => editor?.isActive("italic") ?? false,
            command: (editor) => editor?.chain().focus().toggleItalic().run(),
            icon: ItalicIcon,
        },
        {
            name: "underline",
            isActive: (editor) => editor?.isActive("underline") ?? false,
            command: (editor) =>
                editor?.chain().focus().toggleUnderline().run(),
            icon: UnderlineIcon,
        },
        {
            name: "strike",
            isActive: (editor) => editor?.isActive("strike") ?? false,
            command: (editor) => editor?.chain().focus().toggleStrike().run(),
            icon: StrikethroughIcon,
        },
        {
            name: "code",
            isActive: (editor) => editor?.isActive("code") ?? false,
            command: (editor) => editor?.chain().focus().toggleCode().run(),
            icon: CodeIcon,
        },
        {
            name: "setLanguageTs",
            isActive: () => false,
            command: (editor) =>
                editor
                    ?.chain()
                    .focus()
                    .updateAttributes("codeBlock", { language: "typescript" })
                    .run(),
            icon: Bird, // dùng lại icon để minh họa
        },
    ];
    return (
        <div className="flex">
            {items.map((item) => (
                <EditorBubbleItem
                    key={item.name}
                    onSelect={(editor) => {
                        item.command(editor);
                        const node = editor.state.selection.$from.node();
                        console.log("🚀 ~ TextButtons ~ node:", node);
                    }}
                >
                    <Button size="sm" className="rounded-none" variant="ghost">
                        <item.icon
                            className={cn("h-4 w-4", {
                                "text-blue-500": item.isActive(editor),
                            })}
                        />
                    </Button>
                </EditorBubbleItem>
            ))}
        </div>
    );
};
