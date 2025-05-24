"use client";

import dynamic from "next/dynamic";

const TextEditorComponent = dynamic(
    () => import("./text-editor-content").then((mod) => mod.TextEditorContent),
    {
        ssr: false,
        loading: () => <div>Text Editor Loading...</div>,
    },
);

type Props = {
    size: number;
};

export function TextEditor({ size }: Props) {
    return <TextEditorComponent size={size} />;
}
