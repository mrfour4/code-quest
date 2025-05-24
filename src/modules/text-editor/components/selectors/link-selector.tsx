import { Button } from "@/components/ui/button";
import { PopoverContent } from "@/components/ui/popover";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, Link2, Trash } from "lucide-react";
import { useEditor } from "novel";
import { useEffect, useRef, useState } from "react";
import { getUrlFromString } from "../../lib/utils";

export const LinkSelector = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { editor } = useEditor();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        inputRef.current?.focus();
    });
    if (!editor) return null;

    return (
        <Popover modal={true} open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    size="sm"
                    variant="ghost"
                    className="gap-2 rounded-none border-none"
                >
                    <Link2 className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-60 p-0" sideOffset={10}>
                <form
                    onSubmit={(e) => {
                        const target = e.currentTarget as HTMLFormElement;
                        e.preventDefault();
                        const input = target[0] as HTMLInputElement;
                        const url = getUrlFromString(input.value);
                        if (url) {
                            editor.chain().focus().setLink({ href: url }).run();
                            setOpen(false);
                        }
                    }}
                    className="flex p-1"
                >
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Paste a link"
                        className="bg-background flex-1 p-1 text-sm outline-none"
                        defaultValue={editor.getAttributes("link").href || ""}
                    />
                    {editor.getAttributes("link").href ? (
                        <Button
                            size="icon"
                            variant="outline"
                            type="button"
                            className="flex h-8 items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
                            onClick={() => {
                                editor.chain().focus().unsetLink().run();
                                if (inputRef.current) {
                                    inputRef.current.value = "";
                                }
                                setOpen(false);
                            }}
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button size="icon" className="h-8">
                            <Check className="h-4 w-4" />
                        </Button>
                    )}
                </form>
            </PopoverContent>
        </Popover>
    );
};
