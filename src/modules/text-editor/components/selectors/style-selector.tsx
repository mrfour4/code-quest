import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    BoldIcon,
    Check,
    ChevronDown,
    CodeIcon,
    ItalicIcon,
    type LucideIcon,
    Paintbrush,
    StrikethroughIcon,
    UnderlineIcon,
} from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";

export type SelectorItem = {
    name: string;
    icon: LucideIcon;
    command: (editor: ReturnType<typeof useEditor>["editor"]) => void;
    isActive: (editor: ReturnType<typeof useEditor>["editor"]) => boolean;
};

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
        command: (editor) => editor?.chain().focus().toggleUnderline().run(),
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
];

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const StyleSelector = ({ open, onOpenChange }: Props) => {
    const { editor } = useEditor();
    if (!editor) return null;

    return (
        <Popover modal={true} open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger
                asChild
                className="hover:bg-accent gap-2 rounded-none border-none focus:ring-0"
            >
                <Button size="sm" variant="ghost" className="gap-2">
                    <Paintbrush className="size-4" />
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={5} align="start" className="w-48 p-1">
                {items.map((item) => (
                    <EditorBubbleItem
                        key={item.name}
                        onSelect={(editor) => {
                            item.command(editor);
                        }}
                        className="hover:bg-accent flex cursor-pointer items-center justify-between overflow-auto rounded-sm px-2 py-1 text-sm"
                    >
                        <div className="flex items-center space-x-2">
                            <div className="rounded-sm border p-1">
                                <item.icon className="h-3 w-3" />
                            </div>
                            <span className="capitalize">{item.name}</span>
                        </div>

                        {item.isActive(editor) && <Check className="h-4 w-4" />}
                    </EditorBubbleItem>
                ))}
            </PopoverContent>
        </Popover>
    );
};
