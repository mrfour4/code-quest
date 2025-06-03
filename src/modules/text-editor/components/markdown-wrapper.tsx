"use client";

import Markdown from "react-markdown";

interface MarkdownWrapperProps {
    children: string;
}

export function MarkdownWrapper({ children }: MarkdownWrapperProps) {
    return (
        <div className="w-full overflow-hidden p-2 px-4">
            <div className="prose dark:prose-invert prose-sm markdown-wrap w-full max-w-none">
                <Markdown>{children}</Markdown>
            </div>
        </div>
    );
}
