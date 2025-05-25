"use client";

import { ClientSideSuspense } from "@liveblocks/react/suspense";
import { TextEditorContent } from "./text-editor-content";

type Props = {
    size: number;
};

export function TextEditor({ size }: Props) {
    return (
        <ClientSideSuspense fallback={<div>Text editor loading...</div>}>
            <TextEditorContent size={size} />
        </ClientSideSuspense>
    );
}
