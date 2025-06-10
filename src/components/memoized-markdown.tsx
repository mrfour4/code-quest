import { memo, useMemo } from "react";

import { parseMarkdownIntoBlocks } from "@/lib/utils";
import { MarkdownHighlighter } from "./highlighter-markdown";

const MemoizedMarkdownBlock = memo(
    ({ content }: { content: string }) => {
        return <MarkdownHighlighter content={content} />;
    },
    (prevProps, nextProps) => {
        if (prevProps.content !== nextProps.content) return false;
        return true;
    },
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

export const MemoizedMarkdown = memo(
    ({ content, id }: { content: string; id: string }) => {
        const blocks = useMemo(
            () => parseMarkdownIntoBlocks(content),
            [content],
        );

        return blocks.map((block, index) => (
            <MemoizedMarkdownBlock
                content={block}
                key={`${id}-block_${index}`}
            />
        ));
    },
);

MemoizedMarkdown.displayName = "MemoizedMarkdown";
